package main

import (
	"database/sql"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // No borrar
)

const (
	host     = "localhost"
	port     = "5438"
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type Contacto struct {
	Id              int    `json:"id"`
	Nombre          string `json:"nombre"`
	PrimerApellido  string `json:"primer_apellido"`
	SegundoApellido string `json:"segundo_apellido"`
	Email           string `json:"email"`
	NumeroCelular   string `json:"numero_celular"`
}

func OpenConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	return db
}

func main() {
	r := gin.Default()
	db := OpenConnection()

	//Cors config
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.Default())
	api := r.Group("/api")
	{
		api.GET("/listar-contactos", func(c *gin.Context) {

			rows, err := db.Query("SELECT * FROM contacto")
			if err != nil {
				panic(err)
			}

			var contactos []Contacto

			for rows.Next() {
				var contacto Contacto
				rows.Scan(&contacto.Id, &contacto.Nombre, &contacto.PrimerApellido,
					&contacto.SegundoApellido, &contacto.Email, &contacto.NumeroCelular)
				contactos = append(contactos, contacto)
			}
			res := Response{}
			res.Code = 200
			res.Data = contactos
			res.Message = "Ok"
			c.JSON(res.Code, res)
		})

		api.GET("/contacto/:id", func(c *gin.Context) {
			id := c.Param("id")
			rows, err := db.Query("SELECT * FROM contacto WHERE id = $1", id)
			if err != nil {
				panic(err)
			}

			var contactos []Contacto

			for rows.Next() {
				var contacto Contacto
				rows.Scan(&contacto.Id, &contacto.Nombre, &contacto.PrimerApellido,
					&contacto.SegundoApellido, &contacto.Email, &contacto.NumeroCelular)
				contactos = append(contactos, contacto)
			}
			res := Response{}
			res.Code = 200
			res.Data = contactos
			res.Message = "Ok"
			c.JSON(res.Code, res)
		})

		api.POST("/contacto", func(c *gin.Context) {
			var lastInsertID int
			var payload Contacto
			c.ShouldBindJSON(&payload)
			err := db.QueryRow("INSERT INTO contacto(nombre, primer_apellido, segundo_apellido, email, numero_celular) VALUES($1, $2, $3, $4, $5) returning id;",
				payload.Nombre, payload.PrimerApellido, payload.SegundoApellido, payload.Email, payload.NumeroCelular).Scan(&lastInsertID)
			if err != nil {
				panic(err)
			}
			res := Response{}
			res.Code = 200
			res.Data = lastInsertID
			res.Message = "Ok"
			c.JSON(res.Code, res)
		})
		api.DELETE("/contacto/:id", func(c *gin.Context) {
			id := c.Param("id")
			db.QueryRow("DELETE FROM contacto WHERE id = $1", id)
			res := Response{}
			res.Code = 200
			res.Data = id
			res.Message = "Ok"
			c.JSON(res.Code, res)
		})
		api.PUT("/contacto", func(c *gin.Context) {
			var payload Contacto
			c.ShouldBindJSON(&payload)
			_, err := db.Exec("UPDATE contacto SET nombre = $1, primer_apellido = $2, segundo_apellido = $3, email = $4, numero_celular = $5 WHERE id = $6;",
				payload.Nombre, payload.PrimerApellido, payload.SegundoApellido, payload.Email, payload.NumeroCelular, payload.Id)
			if err != nil {
				panic(err)
			}
			res := Response{}
			res.Code = 200
			res.Data = payload.Id
			res.Message = "Ok"
			c.JSON(res.Code, res)
		})
	}
	r.Run()

}
