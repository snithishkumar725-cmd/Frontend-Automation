package com.employee.automation.runner;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

/**
 * CucumberRunner — JUnit 4 entry point for the Cucumber test suite.
 *
 * Run this class directly from your IDE (right-click → Run) or via Maven:
 *   mvn test -pl EmployeeAutomation
 *
 * Reports are generated in:
 *   target/cucumber-reports/cucumber.html  (HTML report)
 *   target/cucumber-reports/cucumber.json  (JSON for CI integration)
 */
@RunWith(Cucumber.class)
@CucumberOptions(
    // Path to the feature files
    features = "src/test/resources/features",

    // Package containing all step definition classes
    glue = "com.employee.automation.stepdefs",

    // Console output plugin (pretty-prints Gherkin + results)
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "junit:target/cucumber-reports/cucumber-junit.xml"
    },

    // Attach additional step-detail output to console
    monochrome = true,

    // Set to true to show only failing scenarios
    dryRun = false,

    // Filter by tag — leave empty to run all; e.g. "@smoke" for smoke only
    tags = ""
)
public class CucumberRunner {
    /*
     * This class intentionally left empty.
     * JUnit 4 + @RunWith(Cucumber.class) does all the work.
     */
}
