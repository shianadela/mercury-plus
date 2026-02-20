*** Settings ***
Library    AppiumLibrary
Library    Collections
Library    String
Library    OperatingSystem
Library    DateTime
Library    BuiltIn

*** Variables ***
# Appium Configuration
${APPIUM_URL}                 http://localhost:4723/wd/hub
${PLATFORM_NAME}              Android
${PLATFORM_VERSION}           13
${DEVICE_NAME}                emulator-5554
${APP_PACKAGE}                com.mercuryplus.app
${APP_ACTIVITY}               com.mercuryplus.app.MainActivity
${APP_PATH}                   ${CURDIR}/../../android/app/build/outputs/apk/debug/app-debug.apk
${IOS_BUNDLE_ID}              com.mercuryplus.app
${IOS_DEVICE}                 iPhone 15 Pro
${IOS_VERSION}                17.0

# Timeouts
${IMPLICIT_WAIT}              15
${EXPLICIT_WAIT}              20
${SHORT_WAIT}                 5
${ANIMATION_WAIT}             3
${LOADING_DELAY}              2

# Test User Credentials
${VALID_EMAIL}                juan@email.com
${VALID_PASSWORD}             Test@1234
${VALID_NAME}                 Juan Dela Cruz
${VALID_INITIALS}             JD

# New User Registration
${NEW_EMAIL}                  maria.santos@email.com
${NEW_PASSWORD}               Secure@Pass1
${NEW_NAME}                   Maria Santos
${WEAK_PASSWORD}              123
${INVALID_EMAIL}              not-an-email
${EMPTY_STRING}               ${EMPTY}

# Brand Colors
${PRIMARY_GREEN}              #00A86B
${DANGER_RED}                 #EF4444
${WARNING_AMBER}              #F59E0B
${INFO_BLUE}                  #3B82F6
${SUCCESS_GREEN}              #10B981

# Currency
${PESO_SYMBOL}                ₱

# Age Demographics (Target: 25-65)
${MIN_TARGET_AGE}             25
${MAX_TARGET_AGE}             65

*** Keywords ***
# ============================================================
# SETUP & TEARDOWN
# ============================================================
Open Mercury Plus App On Android
    [Documentation]    Launch the Mercury+ app on Android emulator/device
    Open Application    ${APPIUM_URL}
    ...    platformName=${PLATFORM_NAME}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    app=${APP_PATH}
    ...    automationName=UiAutomator2
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    noReset=false
    ...    fullReset=false
    ...    newCommandTimeout=300
    Set Appium Timeout    ${IMPLICIT_WAIT}

Open Mercury Plus App On iOS
    [Documentation]    Launch the Mercury+ app on iOS simulator/device
    Open Application    ${APPIUM_URL}
    ...    platformName=iOS
    ...    platformVersion=${IOS_VERSION}
    ...    deviceName=${IOS_DEVICE}
    ...    bundleId=${IOS_BUNDLE_ID}
    ...    automationName=XCUITest
    ...    noReset=false
    ...    fullReset=false
    ...    newCommandTimeout=300
    Set Appium Timeout    ${IMPLICIT_WAIT}

Close Mercury Plus App
    [Documentation]    Gracefully close the application
    Run Keyword And Ignore Error    Close Application

Reset App State
    [Documentation]    Reset app to clean state without reinstalling
    Reset Application
    Sleep    ${LOADING_DELAY}

# ============================================================
# AUTHENTICATION HELPERS
# ============================================================
Login With Valid Credentials
    [Documentation]    Complete login flow with valid email/password
    Wait Until Element Is Visible    accessibility_id=email-input    ${EXPLICIT_WAIT}
    Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Click Element    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

Login With Google
    [Documentation]    Login via Google SSO mock
    Wait Until Element Is Visible    accessibility_id=google-sign-in    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=google-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

Login With Facebook
    [Documentation]    Login via Facebook SSO mock
    Wait Until Element Is Visible    accessibility_id=facebook-sign-in    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=facebook-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

Login With Apple
    [Documentation]    Login via Apple SSO mock
    Wait Until Element Is Visible    accessibility_id=apple-sign-in    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=apple-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

Navigate To Login Screen
    [Documentation]    Ensure we are on the login screen
    Wait Until Element Is Visible    accessibility_id=login-screen    ${EXPLICIT_WAIT}

Navigate To Signup Screen
    [Documentation]    Navigate from login to signup
    Navigate To Login Screen
    Click Element    accessibility_id=signup-link
    Wait Until Element Is Visible    accessibility_id=signup-screen    ${EXPLICIT_WAIT}

Complete Signup Flow
    [Arguments]    ${name}    ${email}    ${password}    ${confirm}    ${role}=Patient
    [Documentation]    Fill out signup form completely
    Input Text    accessibility_id=fullname-input    ${name}
    Input Text    accessibility_id=email-input    ${email}
    Input Text    accessibility_id=password-input    ${password}
    Input Text    accessibility_id=confirm-password-input    ${confirm}
    Click Element    accessibility_id=role-${role.lower()}
    Click Element    accessibility_id=create-account-button

Complete Onboarding Flow
    [Documentation]    Complete all 3 onboarding steps
    # Step 1: Health Preferences
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=health-chip-Diabetes
    Click Element    accessibility_id=health-chip-Hypertension
    Click Element    accessibility_id=next-button
    # Step 2: Pharmacy Selection
    Wait Until Element Is Visible    accessibility_id=onboarding-step-2    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=branch-Mercury Drug Makati
    Click Element    accessibility_id=next-button
    # Step 3: Notifications
    Wait Until Element Is Visible    accessibility_id=onboarding-step-3    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=get-started-button

Skip Onboarding Flow
    [Documentation]    Skip through all onboarding steps
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=skip-button
    Wait Until Element Is Visible    accessibility_id=onboarding-step-2    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=skip-button
    Wait Until Element Is Visible    accessibility_id=onboarding-step-3    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=skip-button

# ============================================================
# NAVIGATION HELPERS
# ============================================================
Navigate To Tab
    [Arguments]    ${tab_name}
    [Documentation]    Navigate to a specific bottom tab
    Click Element    accessibility_id=tab-${tab_name.lower()}
    Sleep    1

Navigate To Home Tab
    Navigate To Tab    Home

Navigate To Search Tab
    Navigate To Tab    Search

Navigate To Orders Tab
    Navigate To Tab    Orders

Navigate To Health Tab
    Navigate To Tab    Health

Navigate To Profile Tab
    Navigate To Tab    Profile

Go Back
    [Documentation]    Press the back button
    Click Element    accessibility_id=back-button
    Sleep    0.5

# ============================================================
# ELEMENT INTERACTION HELPERS
# ============================================================
Wait And Click
    [Arguments]    ${locator}    ${timeout}=${EXPLICIT_WAIT}
    [Documentation]    Wait for element to be visible then click
    Wait Until Element Is Visible    ${locator}    ${timeout}
    Click Element    ${locator}

Wait And Input Text
    [Arguments]    ${locator}    ${text}    ${timeout}=${EXPLICIT_WAIT}
    [Documentation]    Wait for element to be visible then input text
    Wait Until Element Is Visible    ${locator}    ${timeout}
    Clear Text    ${locator}
    Input Text    ${locator}    ${text}

Element Text Should Contain
    [Arguments]    ${locator}    ${expected}
    [Documentation]    Verify element contains expected text
    ${text}=    Get Text    ${locator}
    Should Contain    ${text}    ${expected}

Element Should Be Visible With Timeout
    [Arguments]    ${locator}    ${timeout}=${EXPLICIT_WAIT}
    Wait Until Element Is Visible    ${locator}    ${timeout}

Element Should Not Be Visible With Timeout
    [Arguments]    ${locator}    ${timeout}=${SHORT_WAIT}
    Wait Until Element Is Not Visible    ${locator}    ${timeout}

Swipe Left On Element
    [Arguments]    ${locator}
    [Documentation]    Swipe left gesture on a specific element
    ${location}=    Get Element Location    ${locator}
    ${size}=    Get Element Size    ${locator}
    ${start_x}=    Evaluate    ${location['x']} + ${size['width']} * 0.8
    ${end_x}=    Evaluate    ${location['x']} + ${size['width']} * 0.2
    ${y}=    Evaluate    ${location['y']} + ${size['height']} / 2
    Swipe    ${start_x}    ${y}    ${end_x}    ${y}    500

Scroll Down
    [Documentation]    Scroll down on the screen
    ${width}=    Get Window Width
    ${height}=    Get Window Height
    ${start_x}=    Evaluate    ${width} / 2
    ${start_y}=    Evaluate    ${height} * 0.7
    ${end_y}=    Evaluate    ${height} * 0.3
    Swipe    ${start_x}    ${start_y}    ${start_x}    ${end_y}    800

Scroll Up
    [Documentation]    Scroll up on the screen
    ${width}=    Get Window Width
    ${height}=    Get Window Height
    ${start_x}=    Evaluate    ${width} / 2
    ${start_y}=    Evaluate    ${height} * 0.3
    ${end_y}=    Evaluate    ${height} * 0.7
    Swipe    ${start_x}    ${start_y}    ${start_x}    ${end_y}    800

Pull To Refresh
    [Documentation]    Pull to refresh gesture
    ${width}=    Get Window Width
    ${height}=    Get Window Height
    ${x}=    Evaluate    ${width} / 2
    ${start_y}=    Evaluate    ${height} * 0.2
    ${end_y}=    Evaluate    ${height} * 0.7
    Swipe    ${x}    ${start_y}    ${x}    ${end_y}    500

# ============================================================
# ALERT / MODAL HELPERS
# ============================================================
Dismiss Alert If Present
    [Documentation]    Dismiss any alert that may be showing
    Run Keyword And Ignore Error    Click Element    accessibility_id=alert-ok-button
    Run Keyword And Ignore Error    Handle Alert    ACCEPT

Verify Alert Contains Text
    [Arguments]    ${expected_text}
    [Documentation]    Verify the current alert contains specific text
    ${alert_text}=    Get Alert Text
    Should Contain    ${alert_text}    ${expected_text}

Accept Alert
    Handle Alert    ACCEPT

Dismiss Alert
    Handle Alert    DISMISS

# ============================================================
# VALIDATION HELPERS
# ============================================================
Verify Screen Is Displayed
    [Arguments]    ${screen_id}
    [Documentation]    Verify a specific screen is currently displayed
    Wait Until Element Is Visible    accessibility_id=${screen_id}    ${EXPLICIT_WAIT}

Verify Element Count
    [Arguments]    ${locator}    ${expected_count}
    [Documentation]    Verify the number of elements matching a locator
    @{elements}=    Get Webelements    ${locator}
    ${actual_count}=    Get Length    ${elements}
    Should Be Equal As Integers    ${actual_count}    ${expected_count}

Verify Price Format
    [Arguments]    ${locator}
    [Documentation]    Verify price displays in Philippine Peso format (₱XX.XX)
    ${text}=    Get Text    ${locator}
    Should Match Regexp    ${text}    ₱[\\d,]+\\.?\\d{0,2}

Take Screenshot On Failure
    [Documentation]    Capture screenshot when a test fails
    Run Keyword If Test Failed    Capture Page Screenshot
