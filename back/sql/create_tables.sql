CREATE TABLE contacto (
    id SERIAL,
    nombre varchar(30) NULL,
    primer_apellido varchar(30) NULL,
    segundo_apellido varchar(30) NULL,
    email varchar(50) NULL,
    numero_celular varchar(30) NULL,
    PRIMARY KEY (id)
);

INSERT INTO contacto (nombre, primer_apellido, segundo_apellido, email, numero_celular)
VALUES ('Juan','Barros','Acuña','brrsjn@gmail.com','+56982576311'),
('Oralia','Carter','Carter','OraliaJCarter@rhyta.com','+781-743-1610'),
('Peggy','Walker','Fitzgerald','GeraldineRHargrove@teleworm.us','909-670-8701'),
('Robbin','Wade','Townsend','RobbinMWade@jourrapide.com','956-544-0968');
