import unittest
from pyunitreport import HTMLTestRunner
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

class Contactos(unittest.TestCase):

    @classmethod # Decorador para que las distintas pruebas corrar en una ventana
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(executable_path='./chromedriver')
        driver = cls.driver
        driver.get('http://localhost:3000')
        driver.maximize_window()
        driver.implicitly_wait(2)

    @classmethod
    def test_agregar_contacto(cls):
        driver = cls.driver
        agregar_contacto = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/button")
        agregar_contacto.click()

        nombre = cls.random_text()
        primer_apellido = cls.random_text()
        segudo_apellido = cls.random_text()
        email = cls.random_text() + "@bot.com"
        numero = cls.random_text()

        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/input[1]").send_keys(nombre)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/input[2]").send_keys(primer_apellido)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/input[3]").send_keys(segudo_apellido)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/input[4]").send_keys(email)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/input[5]").send_keys(numero)
        
        submit = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/form/button")
        submit.click()

        volver = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/button")
        volver.click()

        #https://stackoverflow.com/questions/10978923/how-to-check-if-some-text-is-present-on-a-web-page-using-selenium-2
        cls.assertTrue(cls, nombre in driver.page_source)
        cls.assertTrue(cls, primer_apellido in driver.page_source)
        cls.assertTrue(cls, segudo_apellido in driver.page_source)
        cls.assertTrue(cls, email in driver.page_source)
        cls.assertTrue(cls, numero in driver.page_source)

        #cls.assertTrue(cls,driver.find_element(By.XPATH, "//td[contains(text(), '"+nombre+"')]").is_displayed(cls))

    @classmethod
    def test_editar_contacto(cls):
        driver = cls.driver
        editar_contacto = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[6]/button")
        editar_contacto.click()

        nombre = cls.random_text()
        primer_apellido = cls.random_text()
        segudo_apellido = cls.random_text()
        numero = cls.random_text()
        old_nombre = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[1]").get_attribute("value")
        old_primer_apellido = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[2]").get_attribute("value")
        old_segundo_apellido = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[3]").get_attribute("value")
        old_telefono = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[5]").get_attribute("value")

        
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[1]").send_keys(nombre)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[2]").send_keys(primer_apellido)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[3]").send_keys(segudo_apellido)
        driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/input[5]").send_keys(numero)

        submit = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/form/button")
        submit.click()

        volver = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/button")
        volver.click()

        nuevo_nombre = old_nombre + nombre
        nuevo_primer_apellido = old_primer_apellido + primer_apellido
        nuevo_segundo_apellido = old_segundo_apellido + segudo_apellido
        nuevo_numero = old_telefono + numero

        #https://stackoverflow.com/questions/10978923/how-to-check-if-some-text-is-present-on-a-web-page-using-selenium-2
        cls.assertTrue(cls, nuevo_nombre in driver.page_source)
        cls.assertTrue(cls, nuevo_primer_apellido in driver.page_source)
        cls.assertTrue(cls, nuevo_segundo_apellido in driver.page_source)
        cls.assertTrue(cls, nuevo_numero in driver.page_source)

    @classmethod
    def test_eliminar_contacto(cls):
        driver = cls.driver
        
        old_nombre = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[1]").text
        old_primer_apellido = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[2]").text
        old_segundo_apellido = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[2]").text
        old_telefono = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[2]").text

        eliminar_contacto = driver.find_element(By.XPATH, "//*[@id=\"customers\"]/tbody/tr[2]/td[7]/button")
        eliminar_contacto.click()
        #adaptar a primera fila
        driver.refresh()

        cls.assertTrue(cls, old_nombre not in driver.page_source)
        cls.assertTrue(cls, old_primer_apellido not in driver.page_source)
        cls.assertTrue(cls, old_segundo_apellido not in driver.page_source)
        cls.assertTrue(cls, old_telefono not in driver.page_source)



    def random_text():
        import random
        letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        contador = 0
        text = ""
        while True:
            text = text + random.choice(letters)
            contador = contador + 1
            if contador == 10:
                break
        return text
   


    # Cerramos el navegador una vez terminadas las pruebas
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main(verbosity=2, testRunner = HTMLTestRunner(output = 'reporte', report_name = 'contactos'))