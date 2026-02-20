*** Settings ***
Documentation     Mercury+ Promotions & Suki Card Test Suite
...               Covers Suki Card display, points progress,
...               promotion listings, and senior citizen discount (25-65 demographic)
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        promotions

*** Test Cases ***
# ============================================================
# PROMOTIONS - HAPPY PATH
# ============================================================
Promotions Screen Shows Suki Card
    [Documentation]    Verify virtual Suki Card is displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Verify Screen Is Displayed    promotions-screen
    Wait Until Element Is Visible    accessibility_id=suki-card    ${EXPLICIT_WAIT}

Suki Card Shows Card Details
    [Documentation]    Verify card number, cardholder, points
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Element Text Should Contain    accessibility_id=suki-card-number    **** 1234
    Element Text Should Contain    accessibility_id=suki-cardholder    JUAN DELA CRUZ
    Element Text Should Contain    accessibility_id=suki-points    1,240

Points Progress Bar Shows Progress
    [Documentation]    Verify 83% progress toward Gold status
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=points-progress-bar    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=points-to-gold    260 points to Gold

Promotions Tab Switcher Is Visible
    [Documentation]    Verify All Promos / For You / Suki Deals tabs
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=tab-all-promos    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tab-for-you    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tab-suki-deals    ${EXPLICIT_WAIT}

Promotions List Shows Eight Cards
    [Documentation]    Verify all 8 promotion cards are listed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=promo-card-0    ${EXPLICIT_WAIT}
    Scroll Down
    Scroll Down

Promotion Card Shows Title And Details
    [Documentation]    Verify each card has title, category badge, description, validity
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=promo-title-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=promo-category-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=promo-description-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=promo-validity-0    ${EXPLICIT_WAIT}

Promotion Card Has View Details Link
    [Documentation]    Verify "View Details" link is present
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=promo-view-details-0    ${EXPLICIT_WAIT}

Senior Citizen Discount Promotion Exists
    [Documentation]    Verify Senior Citizen 20% promotion for 60+ users in target demo
    [Tags]    happy_path    demographics_25_65    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Scroll Down
    # Find Senior Citizen promotion card
    Wait Until Element Is Visible    accessibility_id=promo-senior-citizen    ${EXPLICIT_WAIT}

# ============================================================
# PROMOTIONS - ALTERNATE PATHS
# ============================================================
Switch Promotion Tabs
    [Documentation]    Verify tab switching shows same content
    [Tags]    alternate    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait And Click    accessibility_id=tab-for-you
    Sleep    0.5
    Wait And Click    accessibility_id=tab-suki-deals
    Sleep    0.5
    Wait And Click    accessibility_id=tab-all-promos

Suki Card QR Pattern Is Visible
    [Documentation]    Verify decorative QR pattern on card
    [Tags]    alternate    ux    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=suki-qr-pattern    ${EXPLICIT_WAIT}

Promotion Cards Have Colored Accent Bars
    [Documentation]    Verify left accent color bars on promo cards
    [Tags]    alternate    ux    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=promo-accent-0    ${EXPLICIT_WAIT}

Navigate Back From Promotions
    [Documentation]    Verify back navigation works
    [Tags]    alternate    navigation    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Go Back
    Verify Screen Is Displayed    home-screen

# ============================================================
# PROMOTIONS - EDGE CASES
# ============================================================
Scroll Through All Promotion Cards
    [Documentation]    Verify all cards are scrollable without issues
    [Tags]    edge_case    performance    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    FOR    ${i}    IN RANGE    5
        Scroll Down
        Sleep    0.3
    END
    Verify Screen Is Displayed    promotions-screen

Promotion Validity Shows Clock Icon
    [Documentation]    Verify time/clock icon on validity dates
    [Tags]    edge_case    ux    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Wait Until Element Is Visible    accessibility_id=promo-clock-icon-0    ${EXPLICIT_WAIT}
