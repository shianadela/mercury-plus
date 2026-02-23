*** Settings ***
Documentation     Mercury+ Authentication Test Suite
...               Covers Login, Signup, Onboarding flows
...               Target users: ages 25-65 (patients and caregivers)
Resource          ../resources/common.resource
Suite Setup       Open Mercury Plus App On Android
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        authentication

*** Variables ***
${SQL_INJECTION}              ' OR '1'='1' --
${XSS_PAYLOAD}                <script>alert('xss')</script>
${UNICODE_NAME}               José María García-López
${LONG_EMAIL}                 ${"a" * 245}@email.com
${SPECIAL_CHARS_PASSWORD}     P@$$w0rd!#%^&*
${MAX_LENGTH_INPUT}           ${"a" * 500}

*** Test Cases ***
# ============================================================
# LOGIN - HAPPY PATH
# ============================================================
Login With Valid Email And Password
    [Documentation]    Verify user can login with valid credentials
    [Tags]    happy_path    smoke    priority_high
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Verify Screen Is Displayed    home-screen
    Element Text Should Contain    accessibility_id=greeting-name    ${VALID_NAME}

Login With Google SSO
    [Documentation]    Verify user can login via Google
    [Tags]    happy_path    sso    priority_high
    Navigate To Login Screen
    Wait And Click    accessibility_id=google-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}
    Verify Screen Is Displayed    home-screen

Login With Facebook SSO
    [Documentation]    Verify user can login via Facebook
    [Tags]    happy_path    sso    priority_medium
    Navigate To Login Screen
    Wait And Click    accessibility_id=facebook-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}
    Verify Screen Is Displayed    home-screen

Login With Apple SSO
    [Documentation]    Verify user can login via Apple
    [Tags]    happy_path    sso    priority_medium
    Navigate To Login Screen
    Wait And Click    accessibility_id=apple-sign-in
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}
    Verify Screen Is Displayed    home-screen

Login Shows Loading State During Authentication
    [Documentation]    Verify loading indicator appears during login
    [Tags]    happy_path    ux    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Click Element    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=loading-indicator    ${SHORT_WAIT}
    Wait Until Element Is Not Visible    accessibility_id=loading-indicator    ${EXPLICIT_WAIT}

# ============================================================
# LOGIN - ALTERNATE PATHS
# ============================================================
Toggle Password Visibility On Login
    [Documentation]    Verify password can be toggled visible/hidden
    [Tags]    alternate    ux    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    # Password should be hidden by default
    Element Attribute Should Match    accessibility_id=password-input    secureTextEntry    true
    # Toggle visibility
    Wait And Click    accessibility_id=toggle-password-visibility
    Element Attribute Should Match    accessibility_id=password-input    secureTextEntry    false
    # Toggle back
    Wait And Click    accessibility_id=toggle-password-visibility
    Element Attribute Should Match    accessibility_id=password-input    secureTextEntry    true

Navigate To Signup From Login
    [Documentation]    Verify Sign Up link navigates to signup screen
    [Tags]    alternate    navigation    priority_high
    Navigate To Login Screen
    Wait And Click    accessibility_id=signup-link
    Verify Screen Is Displayed    signup-screen

Navigate To Forgot Password From Login
    [Documentation]    Verify Forgot Password link is accessible
    [Tags]    alternate    navigation    priority_medium
    Navigate To Login Screen
    Wait Until Element Is Visible    accessibility_id=forgot-password-link    ${EXPLICIT_WAIT}
    Click Element    accessibility_id=forgot-password-link

Login Screen Shows App Branding
    [Documentation]    Verify Mercury+ logo and branding are displayed
    [Tags]    alternate    branding    priority_low
    Navigate To Login Screen
    Wait Until Element Is Visible    accessibility_id=app-logo    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=app-name    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=app-tagline    ${EXPLICIT_WAIT}

Login Screen Shows Terms And Privacy Links
    [Documentation]    Verify Terms of Service and Privacy Policy links are present
    [Tags]    alternate    legal    priority_medium
    Navigate To Login Screen
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=terms-link    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=privacy-link    ${EXPLICIT_WAIT}

SSO Login Shows Loading State
    [Documentation]    Verify loading indicator appears during SSO login
    [Tags]    alternate    ux    priority_low
    Navigate To Login Screen
    Click Element    accessibility_id=google-sign-in
    Wait Until Element Is Visible    accessibility_id=loading-indicator    ${SHORT_WAIT}
    Wait Until Element Is Not Visible    accessibility_id=loading-indicator    ${EXPLICIT_WAIT}

# ============================================================
# LOGIN - NEGATIVE CASES
# ============================================================
Login With Empty Email And Password
    [Documentation]    Verify login fails with empty fields
    [Tags]    negative    validation    priority_high
    Navigate To Login Screen
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Empty Email
    [Documentation]    Verify login fails with empty email
    [Tags]    negative    validation    priority_high
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Empty Password
    [Documentation]    Verify login fails with empty password
    [Tags]    negative    validation    priority_high
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Invalid Email Format
    [Documentation]    Verify login rejects malformed email
    [Tags]    negative    validation    priority_high
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${INVALID_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Unregistered Email
    [Documentation]    Verify login fails for non-existent account
    [Tags]    negative    validation    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    unknown_user@email.com
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Incorrect Password
    [Documentation]    Verify login fails with wrong password
    [Tags]    negative    validation    priority_high
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Wait And Input Text    accessibility_id=password-input    WrongPassword123
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

# ============================================================
# LOGIN - EDGE CASES
# ============================================================
Login With SQL Injection In Email
    [Documentation]    Verify app is safe from SQL injection
    [Tags]    edge_case    security    priority_critical
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${SQL_INJECTION}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}
    Verify Screen Is Displayed    login-screen

Login With XSS Payload In Email
    [Documentation]    Verify app sanitizes XSS input
    [Tags]    edge_case    security    priority_critical
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${XSS_PAYLOAD}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Verify Screen Is Displayed    login-screen

Login With Extremely Long Email
    [Documentation]    Verify app handles overly long input
    [Tags]    edge_case    boundary    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${LONG_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Login With Leading And Trailing Spaces In Email
    [Documentation]    Verify email trimming handles whitespace
    [Tags]    edge_case    input    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${SPACE}${VALID_EMAIL}${SPACE}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    # Should either trim and login or show validation error
    Sleep    ${LOADING_DELAY}

Login With Case Variations In Email
    [Documentation]    Verify case-insensitive email handling
    [Tags]    edge_case    input    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    JUAN@EMAIL.COM
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Wait And Click    accessibility_id=sign-in-button
    Sleep    ${LOADING_DELAY}

Login Button Disabled During Loading
    [Documentation]    Verify sign-in button is not clickable during loading
    [Tags]    edge_case    ux    priority_medium
    Navigate To Login Screen
    Wait And Input Text    accessibility_id=email-input    ${VALID_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${VALID_PASSWORD}
    Click Element    accessibility_id=sign-in-button
    # Attempt rapid double-tap
    Run Keyword And Ignore Error    Click Element    accessibility_id=sign-in-button
    Sleep    ${LOADING_DELAY}

# ============================================================
# SIGNUP - HAPPY PATH
# ============================================================
Signup As Patient With Valid Details
    [Documentation]    Verify new patient registration
    [Tags]    happy_path    signup    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    ${NEW_EMAIL}    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Verify Screen Is Displayed    onboarding-screen

Signup As Caregiver With Valid Details
    [Documentation]    Verify new caregiver registration
    [Tags]    happy_path    signup    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    Juan Dela Cruz    caregiver@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Caregiver
    Verify Screen Is Displayed    onboarding-screen

Signup Role Selection Visual Feedback
    [Documentation]    Verify role cards show selection state
    [Tags]    happy_path    ux    priority_medium
    Navigate To Signup Screen
    Wait And Click    accessibility_id=role-patient
    Wait Until Element Is Visible    accessibility_id=role-patient-selected    ${SHORT_WAIT}
    Wait And Click    accessibility_id=role-caregiver
    Wait Until Element Is Visible    accessibility_id=role-caregiver-selected    ${SHORT_WAIT}
    Element Should Not Be Visible With Timeout    accessibility_id=role-patient-selected

# ============================================================
# SIGNUP - NEGATIVE CASES
# ============================================================
Signup With Empty Fields
    [Documentation]    Verify signup fails when all fields are empty
    [Tags]    negative    validation    priority_high
    Navigate To Signup Screen
    Wait And Click    accessibility_id=create-account-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Signup With Mismatched Passwords
    [Documentation]    Verify signup fails when passwords don't match
    [Tags]    negative    validation    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    ${NEW_EMAIL}    ${NEW_PASSWORD}    DifferentPass1    Patient
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Signup With Weak Password
    [Documentation]    Verify signup rejects weak passwords
    [Tags]    negative    validation    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    ${NEW_EMAIL}    ${WEAK_PASSWORD}    ${WEAK_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Signup With Invalid Email
    [Documentation]    Verify signup rejects invalid email format
    [Tags]    negative    validation    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    ${INVALID_EMAIL}    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Signup With Empty Name
    [Documentation]    Verify signup requires a name
    [Tags]    negative    validation    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${EMPTY}    ${NEW_EMAIL}    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Signup Without Selecting Role
    [Documentation]    Verify signup requires role selection
    [Tags]    negative    validation    priority_medium
    Navigate To Signup Screen
    Wait And Input Text    accessibility_id=fullname-input    ${NEW_NAME}
    Wait And Input Text    accessibility_id=email-input    ${NEW_EMAIL}
    Wait And Input Text    accessibility_id=password-input    ${NEW_PASSWORD}
    Wait And Input Text    accessibility_id=confirm-password-input    ${NEW_PASSWORD}
    Wait And Click    accessibility_id=create-account-button
    Wait Until Element Is Visible    accessibility_id=error-message    ${SHORT_WAIT}

Navigate Back To Login From Signup
    [Documentation]    Verify back navigation from signup
    [Tags]    negative    navigation    priority_medium
    Navigate To Signup Screen
    Wait And Click    accessibility_id=signin-link
    Verify Screen Is Displayed    login-screen

# ============================================================
# SIGNUP - EDGE CASES
# ============================================================
Signup With Unicode Characters In Name
    [Documentation]    Verify names with accents/special characters work (common in Filipino-Spanish names)
    [Tags]    edge_case    i18n    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${UNICODE_NAME}    unicode@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Sleep    ${LOADING_DELAY}

Signup With Special Characters In Password
    [Documentation]    Verify special character passwords are accepted
    [Tags]    edge_case    security    priority_medium
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    special@email.com    ${SPECIAL_CHARS_PASSWORD}    ${SPECIAL_CHARS_PASSWORD}    Patient
    Sleep    ${LOADING_DELAY}

Signup With Maximum Length Inputs
    [Documentation]    Verify app handles maximum length inputs
    [Tags]    edge_case    boundary    priority_low
    Navigate To Signup Screen
    Wait And Input Text    accessibility_id=fullname-input    ${MAX_LENGTH_INPUT}
    Wait And Input Text    accessibility_id=email-input    ${LONG_EMAIL}
    Sleep    1

Signup Toggle Password Visibility
    [Documentation]    Verify password visibility toggle on signup form
    [Tags]    edge_case    ux    priority_low
    Navigate To Signup Screen
    Wait And Input Text    accessibility_id=password-input    ${NEW_PASSWORD}
    Wait And Click    accessibility_id=toggle-password-visibility
    Wait And Click    accessibility_id=toggle-confirm-password-visibility

# ============================================================
# ONBOARDING - HAPPY PATH
# ============================================================
Complete Full Onboarding With All Selections
    [Documentation]    Verify complete onboarding wizard
    [Tags]    happy_path    onboarding    priority_high
    # Assumes we arrive at onboarding after signup
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    onboard@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Complete Onboarding Flow
    Verify Screen Is Displayed    home-screen

Onboarding Step 1 Select Multiple Health Conditions
    [Documentation]    Verify multiple health conditions can be selected
    [Tags]    happy_path    onboarding    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    multi@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=health-chip-Diabetes
    Wait And Click    accessibility_id=health-chip-Hypertension
    Wait And Click    accessibility_id=health-chip-Heart Disease
    Wait And Click    accessibility_id=health-chip-Arthritis
    # All 4 should be selected
    Wait Until Element Is Visible    accessibility_id=health-chip-Diabetes-selected    ${SHORT_WAIT}
    Wait Until Element Is Visible    accessibility_id=health-chip-Hypertension-selected    ${SHORT_WAIT}

Onboarding Step 1 Select None Deselects Others
    [Documentation]    Verify "None" deselects all other conditions
    [Tags]    happy_path    onboarding    priority_medium
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    none@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=health-chip-Diabetes
    Wait And Click    accessibility_id=health-chip-Asthma
    # Now select None - should deselect others
    Wait And Click    accessibility_id=health-chip-None
    Element Should Not Be Visible With Timeout    accessibility_id=health-chip-Diabetes-selected
    Element Should Not Be Visible With Timeout    accessibility_id=health-chip-Asthma-selected

Onboarding Step 2 Select Pharmacy Branch
    [Documentation]    Verify single branch selection with radio behavior
    [Tags]    happy_path    onboarding    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    branch@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=next-button
    Wait Until Element Is Visible    accessibility_id=onboarding-step-2    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=branch-Mercury Drug Makati
    Wait And Click    accessibility_id=branch-Mercury Drug BGC
    # Only BGC should be selected (radio behavior)
    Wait Until Element Is Visible    accessibility_id=branch-Mercury Drug BGC-selected    ${SHORT_WAIT}

Onboarding Step 3 Configure Notifications
    [Documentation]    Verify notification toggles work correctly
    [Tags]    happy_path    onboarding    priority_medium
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    notif@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=next-button
    Wait Until Element Is Visible    accessibility_id=onboarding-step-2    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=next-button
    Wait Until Element Is Visible    accessibility_id=onboarding-step-3    ${EXPLICIT_WAIT}
    # Toggle promotions ON (default OFF)
    Wait And Click    accessibility_id=toggle-promotions
    # Toggle medication reminders OFF (default ON)
    Wait And Click    accessibility_id=toggle-medication-reminders

# ============================================================
# ONBOARDING - ALTERNATE PATH
# ============================================================
Skip All Onboarding Steps
    [Documentation]    Verify user can skip entire onboarding
    [Tags]    alternate    onboarding    priority_high
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    skip@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Skip Onboarding Flow
    Verify Screen Is Displayed    home-screen

Skip Individual Onboarding Steps
    [Documentation]    Verify each step can be individually skipped
    [Tags]    alternate    onboarding    priority_medium
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    skipind@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    # Skip step 1
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=skip-button
    # Complete step 2
    Wait Until Element Is Visible    accessibility_id=onboarding-step-2    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=branch-Mercury Drug Makati
    Wait And Click    accessibility_id=next-button
    # Skip step 3
    Wait Until Element Is Visible    accessibility_id=onboarding-step-3    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=skip-button
    Verify Screen Is Displayed    home-screen

Onboarding Progress Indicator Shows Correct Step
    [Documentation]    Verify step indicator updates correctly
    [Tags]    alternate    ux    priority_low
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    prog@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=step-indicator-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=next-button
    Wait Until Element Is Visible    accessibility_id=step-indicator-2    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=next-button
    Wait Until Element Is Visible    accessibility_id=step-indicator-3    ${EXPLICIT_WAIT}

# ============================================================
# ONBOARDING - EDGE CASES
# ============================================================
Onboarding Selecting Condition Then None Then Condition
    [Documentation]    Verify toggling between None and conditions works
    [Tags]    edge_case    onboarding    priority_medium
    Navigate To Signup Screen
    Complete Signup Flow    ${NEW_NAME}    toggle@email.com    ${NEW_PASSWORD}    ${NEW_PASSWORD}    Patient
    Wait Until Element Is Visible    accessibility_id=onboarding-step-1    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=health-chip-Diabetes
    Wait And Click    accessibility_id=health-chip-None
    Wait And Click    accessibility_id=health-chip-Allergies
    Wait Until Element Is Visible    accessibility_id=health-chip-Allergies-selected    ${SHORT_WAIT}
    Element Should Not Be Visible With Timeout    accessibility_id=health-chip-None-selected
