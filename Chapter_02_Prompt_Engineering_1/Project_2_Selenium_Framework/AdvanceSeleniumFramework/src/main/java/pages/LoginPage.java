package com.enterprise.automation.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.TimeoutException;

public class LoginPage {
    private WebDriver driver;

    @FindBy(xpath = "//input[@type='text' or @type='email']")
    private WebElement usernameField;

    @FindBy(xpath = "//input[@type='password']")
    private WebElement passwordField;

    @FindBy(xpath = "//button[contains(., 'Sign In')] | //input[@type='submit']")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(PageFactory.DONT_LAPSE, this);
    }

    public void enterUsername(String username) {
        try {
            usernameField.clear();
            usernameField.sendKeys(username);
        } catch (Exception e) {
            throw new RuntimeException("Failed to interact with Username field: " + e.getMessage());
        }
    }

    public void enterPassword(String password) {
        try {
            passwordField.clear();
            passwordField.sendKeys(password);
        } catch (Exception e) {
            throw new RuntimeException("Failed to interact with Password field: " + e.getMessage());
        }
    }

    public void clickLogin() {
        try {
            loginButton.click();
        } catch (Exception e) {
            throw new RuntimeException("Failed to click Login button: " + e.getMessage());
        }
    }
}
