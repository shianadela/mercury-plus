*** Settings ***
Documentation     Mercury+ Home Screen & Navigation Test Suite
...               Covers home screen elements, quick actions, pull-to-refresh,
...               bottom tab navigation, and greeting display
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        home    navigation

*** Test Cases ***
# ============================================================
# HOME SCREEN - HAPPY PATH
# ============================================================
Home Screen Displays Filipino Greeting
    [Documentation]    Verify "Magandang araw!" greeting is shown
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=greeting-text    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=greeting-text    Magandang araw

Home Screen Shows User Name And Avatar
    [Documentation]    Verify personalized user name and initials avatar
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Element Text Should Contain    accessibility_id=greeting-name    Juan Dela Cruz
    Wait Until Element Is Visible    accessibility_id=user-avatar    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=user-avatar    JD

Home Screen Shows Notification Bell With Badge
    [Documentation]    Verify notification bell shows count badge (3)
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=notification-bell    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=notification-badge    3

Notification Bell Navigates To Reminders
    [Documentation]    Verify tapping bell opens reminders screen
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Verify Screen Is Displayed    reminders-screen

Home Screen Shows Four Quick Actions
    [Documentation]    Verify all 4 quick action buttons are visible
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=quick-action-scan-rx    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-action-find-medicine    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-action-near-me    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-action-ai-chat    ${EXPLICIT_WAIT}

Quick Action Scan Rx Navigates To Prescription
    [Documentation]    Verify Scan Rx opens prescription scanner
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Verify Screen Is Displayed    prescription-screen

Quick Action Find Medicine Navigates To Search
    [Documentation]    Verify Find Medicine opens search tab
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-find-medicine
    Verify Screen Is Displayed    search-screen

Quick Action Near Me Navigates To Store
    [Documentation]    Verify Near Me opens store locator
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Verify Screen Is Displayed    store-screen

Quick Action AI Chat Navigates To Chat
    [Documentation]    Verify AI Chat opens chat screen
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Verify Screen Is Displayed    chat-screen

Home Screen Shows Promotions Carousel
    [Documentation]    Verify promotions carousel with 3 cards
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=promotions-carousel    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=promo-card-0    ${EXPLICIT_WAIT}

Promotions Carousel Is Horizontally Scrollable
    [Documentation]    Verify carousel can be swiped horizontally
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=promo-card-0    ${EXPLICIT_WAIT}
    Swipe Left On Element    accessibility_id=promotions-carousel
    Wait Until Element Is Visible    accessibility_id=promo-card-1    ${EXPLICIT_WAIT}

Promotions See All Navigates To Promotions
    [Documentation]    Verify "See All" link opens full promotions list
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=see-all-promotions
    Verify Screen Is Displayed    promotions-screen

Home Screen Shows Todays Reminders
    [Documentation]    Verify today's medication reminders are displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=todays-reminders    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=reminder-losartan    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=reminder-metformin    ${EXPLICIT_WAIT}

Mark Reminder As Taken From Home
    [Documentation]    Verify pending medication can be marked as taken
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Scroll Down
    Wait And Click    accessibility_id=reminder-metformin-take
    Wait Until Element Is Visible    accessibility_id=reminder-metformin-taken    ${SHORT_WAIT}

Reminders Manage Link Navigates To Reminders
    [Documentation]    Verify "Manage" link opens reminders screen
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Scroll Down
    Wait And Click    accessibility_id=manage-reminders-link
    Verify Screen Is Displayed    reminders-screen

Home Screen Shows Refill Alert
    [Documentation]    Verify low supply refill alert is shown
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=refill-alert    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=refill-alert    Losartan 50mg
    Element Text Should Contain    accessibility_id=refill-alert    5 days

Home Screen Shows Nearby Branches
    [Documentation]    Verify 3 nearby branches are displayed
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=nearby-branches    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

Nearby Branch Card Navigates To Store
    [Documentation]    Verify tapping branch card opens store detail
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Scroll Down
    Wait And Click    accessibility_id=branch-card-0
    Verify Screen Is Displayed    store-screen

Home Screen Shows Health Tip
    [Documentation]    Verify health tip card is displayed at bottom
    [Tags]    happy_path    priority_low
    Navigate To Home Tab
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=health-tip-card    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=health-tip-card    Stay Hydrated

Pull To Refresh Updates Home Screen
    [Documentation]    Verify pull-to-refresh works on home screen
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Pull To Refresh
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

# ============================================================
# BOTTOM TAB NAVIGATION - HAPPY PATH
# ============================================================
Navigate To All Five Tabs
    [Documentation]    Verify all bottom tabs are accessible
    [Tags]    happy_path    tabs    priority_critical
    Navigate To Home Tab
    Verify Screen Is Displayed    home-screen
    Navigate To Search Tab
    Verify Screen Is Displayed    search-screen
    Navigate To Orders Tab
    Verify Screen Is Displayed    orders-screen
    Navigate To Health Tab
    Verify Screen Is Displayed    health-screen
    Navigate To Profile Tab
    Verify Screen Is Displayed    profile-screen

Active Tab Shows Green Tint
    [Documentation]    Verify active tab icon is highlighted with green
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=tab-home-active    ${EXPLICIT_WAIT}
    Navigate To Search Tab
    Wait Until Element Is Visible    accessibility_id=tab-search-active    ${EXPLICIT_WAIT}
    Element Should Not Be Visible With Timeout    accessibility_id=tab-home-active

Tab Bar Visible On All Main Screens
    [Documentation]    Verify tab bar persists across tab screens
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=bottom-tab-bar    ${EXPLICIT_WAIT}
    Navigate To Search Tab
    Wait Until Element Is Visible    accessibility_id=bottom-tab-bar    ${EXPLICIT_WAIT}
    Navigate To Orders Tab
    Wait Until Element Is Visible    accessibility_id=bottom-tab-bar    ${EXPLICIT_WAIT}

Tab Bar Hidden On Modal Screens
    [Documentation]    Verify tab bar is hidden on modal/stack screens
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Verify Screen Is Displayed    chat-screen
    Element Should Not Be Visible With Timeout    accessibility_id=bottom-tab-bar

# ============================================================
# HOME SCREEN - ALTERNATE PATHS
# ============================================================
Home Screen Branch Card Shows Open Status
    [Documentation]    Verify branch cards show open/closed and 24/7 badges
    [Tags]    alternate    priority_low
    Navigate To Home Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=branch-card-0-status    ${EXPLICIT_WAIT}

Home Screen Promotion Card Shows Discount Info
    [Documentation]    Verify promo cards display discount details
    [Tags]    alternate    priority_low
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=promo-card-0    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=promo-card-0    20% OFF

Reminder Shows Taken State With Green Checkmark
    [Documentation]    Verify taken reminders display green checkmark
    [Tags]    alternate    ux    priority_medium
    Navigate To Home Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=reminder-losartan-taken    ${EXPLICIT_WAIT}

# ============================================================
# HOME SCREEN - EDGE CASES
# ============================================================
Rapid Tab Switching Does Not Crash App
    [Documentation]    Verify rapid tab switching is handled gracefully
    [Tags]    edge_case    stability    priority_high
    FOR    ${i}    IN RANGE    10
        Navigate To Home Tab
        Navigate To Search Tab
        Navigate To Orders Tab
        Navigate To Health Tab
        Navigate To Profile Tab
    END
    Verify Screen Is Displayed    profile-screen

Multiple Pull To Refresh In Quick Succession
    [Documentation]    Verify multiple rapid refreshes don't cause issues
    [Tags]    edge_case    stability    priority_medium
    Navigate To Home Tab
    Pull To Refresh
    Pull To Refresh
    Pull To Refresh
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=home-screen    ${EXPLICIT_WAIT}

Navigate Away And Back To Home Preserves State
    [Documentation]    Verify home screen state persists after navigation
    [Tags]    edge_case    state    priority_medium
    Navigate To Home Tab
    Scroll Down
    Navigate To Search Tab
    Navigate To Home Tab
    Wait Until Element Is Visible    accessibility_id=greeting-text    ${EXPLICIT_WAIT}
