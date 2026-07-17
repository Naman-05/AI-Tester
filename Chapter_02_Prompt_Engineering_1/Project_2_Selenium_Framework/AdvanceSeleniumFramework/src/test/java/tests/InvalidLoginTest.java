package com.enterprise.automation.tests;

import io.github.bonigarcia.webdrivermanager.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.enterprise.automation.pages.LoginPage;

public class InvalidLoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://login.salesforce.com/?locale=in");
        loginPage = new LoginPage(driver);
    }

    @Test
    public void testFailedLoginWithIncorrectCredentials() {
        try {
            loginPage.enterUsername("wrong_user@example.com");
            loginPage.enterPassword("WrongPassword123");
            loginPage.clickLogin();
            boolean isErrorVisible = driver.findElements(org.openqa.selenium.By.xpath("//div[contains(text(), 'Invalid')]").size() > 0;
            Assert.assertTrue(isErrorVisible, "Validation Test Failed: Error message not displayed.");
        } catch (Exception e) {
            Assert.fail("Validation Test Failed due to exception: " + e.getMessage());
        }
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
