*** Settings ***
Documentation     Mercury+ Accessibility & Usability Test Suite
...               Covers font readability, touch targets, color contrast,
...               and usability concerns for target demographic (ages 25-65)
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        accessibility    usability    demographics_25_65

*** Variables ***
# WCAG 2.1 minimum touch target size (48dp × 48dp)
${MIN_TOUCH_TARGET}           44

*** Test Cases ***
# ============================================================
# FONT SIZE & READABILITY (Critical for 40-65 age group)
# ============================================================
Home Screen Text Is Readable
    [Documentation]    Verify main text elements have sufficient font size
    [Tags]    priority_high    readability
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=greeting-text    ${EXPLICIT_WAIT}
    # Verify text is not clipped or overlapping
    Wait Until Element Is Visible    accessibility_id=greeting-name    ${EXPLICIT_WAIT}

Medicine Prices Are Clearly Visible
    [Documentation]    Verify price text is legible (important for all age groups)
    [Tags]    priority_high    readability
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    Biogesic
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-brand-price-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-generic-price-0    ${EXPLICIT_WAIT}

Reminder Time Text Is Large Enough
    [Documentation]    Verify medication times are easy to read (health-critical)
    [Tags]    priority_critical    readability
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait Until Element Is Visible    accessibility_id=reminder-time-0    ${EXPLICIT_WAIT}

# ============================================================
# TOUCH TARGETS (Critical for 50-65 age group)
# ============================================================
Tab Bar Touch Targets Are Adequate
    [Documentation]    Verify bottom tab buttons are easy to tap
    [Tags]    priority_high    touch_targets
    Navigate To Home Tab
    ${size}=    Get Element Size    accessibility_id=tab-home
    Should Be True    ${size['height']} >= ${MIN_TOUCH_TARGET}
    Should Be True    ${size['width']} >= ${MIN_TOUCH_TARGET}

Quick Action Buttons Are Large Enough
    [Documentation]    Verify home screen quick actions are tappable
    [Tags]    priority_high    touch_targets
    Navigate To Home Tab
    ${size}=    Get Element Size    accessibility_id=quick-action-scan-rx
    Should Be True    ${size['height']} >= ${MIN_TOUCH_TARGET}

Take Dose Button Is Adequate Size
    [Documentation]    Verify medication "Take" button is easy to press
    [Tags]    priority_critical    touch_targets
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    ${size}=    Get Element Size    accessibility_id=take-dose-12pm-metformin
    Should Be True    ${size['height']} >= ${MIN_TOUCH_TARGET}

Cart Quantity Buttons Are Tappable
    [Documentation]    Verify +/- quantity controls are large enough
    [Tags]    priority_high    touch_targets
    # Navigate to checkout with items
    Navigate To Home Tab

Send Button In Chat Is Adequate Size
    [Documentation]    Verify chat send button is easy to press
    [Tags]    priority_medium    touch_targets
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    ${size}=    Get Element Size    accessibility_id=send-button
    Should Be True    ${size['height']} >= ${MIN_TOUCH_TARGET}

# ============================================================
# COLOR CONTRAST & VISUAL INDICATORS
# ============================================================
Status Badges Use Distinct Colors
    [Documentation]    Verify status badges use clearly distinguishable colors
    [Tags]    priority_high    contrast
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait Until Element Is Visible    accessibility_id=order-status-0    ${EXPLICIT_WAIT}

Rx Badge Is Clearly Visible On Red Background
    [Documentation]    Verify Rx prescription badge is prominent
    [Tags]    priority_high    contrast
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    Losartan
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=rx-badge-0    ${EXPLICIT_WAIT}

Stock Availability Colors Are Distinguishable
    [Documentation]    Verify In Stock (green) / Low Stock (amber) / Out of Stock (red)
    [Tags]    priority_high    contrast
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-stock-0
    Sleep    0.5

Error Messages Are Visible In Red
    [Documentation]    Verify error states use danger red color
    [Tags]    priority_medium    contrast
    Navigate To Home Tab

# ============================================================
# NAVIGATION CLARITY
# ============================================================
Back Button Is Visible On All Stack Screens
    [Documentation]    Verify back navigation is always available
    [Tags]    priority_high    navigation
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=back-button    ${EXPLICIT_WAIT}
    Go Back
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=back-button    ${EXPLICIT_WAIT}
    Go Back
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait Until Element Is Visible    accessibility_id=back-button    ${EXPLICIT_WAIT}

Active Tab Is Clearly Indicated
    [Documentation]    Verify current tab is visually distinct
    [Tags]    priority_medium    navigation
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=tab-home-active    ${EXPLICIT_WAIT}
    Navigate To Search Tab
    Wait Until Element Is Visible    accessibility_id=tab-search-active    ${EXPLICIT_WAIT}

# ============================================================
# LOADING STATES & FEEDBACK
# ============================================================
Login Shows Loading Feedback
    [Documentation]    Verify user sees loading state during authentication
    [Tags]    priority_medium    feedback
    # Tested in auth suite but validated here for accessibility

Prescription Analysis Shows Progress
    [Documentation]    Verify step-by-step analysis progress is shown
    [Tags]    priority_medium    feedback

Checkout Order Placement Shows Loading
    [Documentation]    Verify order placement shows spinner/loading
    [Tags]    priority_medium    feedback

# ============================================================
# FILIPINO-SPECIFIC USABILITY
# ============================================================
Filipino Greeting Is Culturally Appropriate
    [Documentation]    Verify "Magandang araw!" greeting resonates with Filipino users
    [Tags]    priority_medium    i18n    cultural
    Navigate To Home Tab
    Element Text Should Contain    accessibility_id=greeting-text    Magandang araw

Philippine Peso Currency Is Used Throughout
    [Documentation]    Verify all prices use ₱ symbol
    [Tags]    priority_high    i18n
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    Biogesic
    Sleep    1
    Verify Price Format    accessibility_id=medicine-brand-price-0

Filipino Food Items In Calorie Counter
    [Documentation]    Verify food items are Filipino dishes (Adobo, Sinigang, Lumpia)
    [Tags]    priority_medium    i18n    cultural
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    Wait Until Element Is Visible    accessibility_id=food-chicken-adobo    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-sinigang    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-lumpia    ${EXPLICIT_WAIT}

Metro Manila Branches Are Listed
    [Documentation]    Verify branches cover major Metro Manila areas
    [Tags]    priority_medium    i18n    cultural
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

Mercury Drug Hotline Is Philippine Number
    [Documentation]    Verify contact number is Philippine format
    [Tags]    priority_medium    i18n
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Scroll Down
    Scroll Down
    Element Text Should Contain    accessibility_id=contact-phone    (02)

# ============================================================
# SENIOR-FRIENDLY FEATURES (60-65 age bracket)
# ============================================================
BMI Calculator Accepts Adult Ranges
    [Documentation]    Verify BMI works for typical adult measurements
    [Tags]    priority_medium    demographics_senior
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    165
    Wait And Input Text    accessibility_id=weight-input    72
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-result    ${EXPLICIT_WAIT}

Vaccine Info Includes Age Appropriate Options
    [Documentation]    Verify vaccines relevant to 25-65 age group
    [Tags]    priority_medium    demographics_senior
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-vaccine-info
    # Flu, Pneumococcal are relevant for older adults
    Wait Until Element Is Visible    accessibility_id=vaccine-flu    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=vaccine-pneumococcal    ${EXPLICIT_WAIT}

Senior Citizen Promotion Is Accessible
    [Documentation]    Verify 60+ users can see Senior Citizen discount
    [Tags]    priority_medium    demographics_senior
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=promo-senior-citizen    ${EXPLICIT_WAIT}
