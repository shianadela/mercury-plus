*** Settings ***
Documentation     Mercury+ Profile & Account Management Test Suite
...               Covers profile display, menu navigation, sign out,
...               and coming soon features
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        profile

*** Test Cases ***
# ============================================================
# PROFILE - HAPPY PATH
# ============================================================
Profile Shows User Avatar And Info
    [Documentation]    Verify avatar initials, name, email, and role badge
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=profile-avatar    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=profile-avatar    JD
    Element Text Should Contain    accessibility_id=profile-name    Juan Dela Cruz
    Element Text Should Contain    accessibility_id=profile-email    juan@email.com
    Wait Until Element Is Visible    accessibility_id=profile-role-badge    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=profile-role-badge    Patient

Profile Shows Stats Row
    [Documentation]    Verify Orders (12), Prescriptions (5), Suki Points (1,240)
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=stat-orders    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=stat-orders-value    12
    Element Text Should Contain    accessibility_id=stat-prescriptions-value    5
    Element Text Should Contain    accessibility_id=stat-suki-points-value    1,240

Profile Shows Suki Card Gold Banner
    [Documentation]    Verify Suki Card banner with points
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=suki-card-banner    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=suki-card-banner    1,240 points

Suki Card Banner Navigates To Suki Promotions
    [Documentation]    Verify tapping Suki banner opens promotions
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=suki-card-banner
    Verify Screen Is Displayed    promotions-screen

Profile Shows Ten Menu Items
    [Documentation]    Verify all 10 menu items are displayed
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=menu-suki-card    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-prescriptions    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-reminders    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-caregiver-access    ${EXPLICIT_WAIT}
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=menu-payment-methods    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-addresses    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-notifications    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-language    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-help-support    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=menu-about    ${EXPLICIT_WAIT}

Menu Suki Card Navigates To Promotions
    [Documentation]    Verify Suki Card menu item navigation
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-suki-card
    Verify Screen Is Displayed    promotions-screen

Menu Prescriptions Navigates To Prescription
    [Documentation]    Verify My Prescriptions menu item navigation
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-prescriptions
    Verify Screen Is Displayed    prescription-screen

Menu Reminders Navigates To Reminders
    [Documentation]    Verify Medication Reminders menu item navigation
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-reminders
    Verify Screen Is Displayed    reminders-screen

Menu Help Support Navigates To Support
    [Documentation]    Verify Help & Support menu item navigation
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Verify Screen Is Displayed    support-screen

Menu Caregiver Shows Coming Soon
    [Documentation]    Verify Caregiver Access shows coming soon alert
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-caregiver-access
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Menu Payment Methods Shows Coming Soon
    [Documentation]    Verify Payment Methods shows coming soon alert
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=menu-payment-methods
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Menu Addresses Shows Coming Soon
    [Documentation]    Verify Addresses shows coming soon alert
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=menu-addresses
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Menu Notifications Shows Coming Soon
    [Documentation]    Verify Notifications shows coming soon alert
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=menu-notifications
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Menu Language Shows Coming Soon
    [Documentation]    Verify Language shows coming soon alert
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=menu-language
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Menu About Shows Coming Soon
    [Documentation]    Verify About shows coming soon alert
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=menu-about
    Sleep    1
    Verify Alert Contains Text    Coming Soon
    Accept Alert

Sign Out Shows Confirmation Dialog
    [Documentation]    Verify Sign Out prompts confirmation
    [Tags]    happy_path    priority_critical
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=sign-out-button
    Sleep    1
    Verify Alert Contains Text    Sign Out

Sign Out Cancel Returns To Profile
    [Documentation]    Verify cancelling sign out stays on profile
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=sign-out-button
    Sleep    1
    Dismiss Alert
    Verify Screen Is Displayed    profile-screen

Sign Out Confirm Returns To Login
    [Documentation]    Verify confirming sign out navigates to login
    [Tags]    happy_path    priority_critical
    Navigate To Profile Tab
    Scroll Down
    Wait And Click    accessibility_id=sign-out-button
    Sleep    1
    Accept Alert
    Verify Screen Is Displayed    login-screen

Profile Shows Version Footer
    [Documentation]    Verify "Mercury+ v1.0.0" footer text
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=profile-version    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=profile-version    v1.0.0

# ============================================================
# PROFILE - ALTERNATE PATHS
# ============================================================
Profile Avatar Has Camera Edit Overlay
    [Documentation]    Verify camera/edit icon overlay on avatar
    [Tags]    alternate    ux    priority_low
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=avatar-edit-button    ${EXPLICIT_WAIT}

Menu Items Show Chevron Icons
    [Documentation]    Verify each menu item has a right chevron
    [Tags]    alternate    ux    priority_low
    Navigate To Profile Tab
    Wait Until Element Is Visible    accessibility_id=menu-chevron-0    ${EXPLICIT_WAIT}

Suki Card Menu Shows Points Subtitle
    [Documentation]    Verify Suki Card menu shows "1,240 pts" subtitle
    [Tags]    alternate    priority_low
    Navigate To Profile Tab
    Element Text Should Contain    accessibility_id=menu-suki-card-subtitle    1,240 pts

Language Menu Shows Current Language
    [Documentation]    Verify Language menu shows "English" subtitle
    [Tags]    alternate    priority_low
    Navigate To Profile Tab
    Scroll Down
    Element Text Should Contain    accessibility_id=menu-language-subtitle    English

# ============================================================
# PROFILE - EDGE CASES
# ============================================================
Rapid Menu Item Tapping
    [Documentation]    Verify rapid tapping on menu items doesn't crash
    [Tags]    edge_case    stability    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-caregiver-access
    Accept Alert
    Wait And Click    accessibility_id=menu-caregiver-access
    Accept Alert
    Verify Screen Is Displayed    profile-screen

Sign Out After Navigation Returns To Login
    [Documentation]    Verify sign out from deep navigation returns to login
    [Tags]    edge_case    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Go Back
    Scroll Down
    Wait And Click    accessibility_id=sign-out-button
    Sleep    1
    Accept Alert
    Verify Screen Is Displayed    login-screen
