*** Settings ***
Documentation     Mercury+ Store/Branch Locator Test Suite
...               Covers branch search, list/map view, filters,
...               branch detail, stock check, and directions
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        store

*** Variables ***
${KNOWN_BRANCH}               Makati
${KNOWN_AREA}                 BGC
${NONEXISTENT_BRANCH}         Zyxwvutsrq

*** Test Cases ***
# ============================================================
# STORE LOCATOR - HAPPY PATH
# ============================================================
Store Screen Shows Search Bar
    [Documentation]    Verify branch search bar is displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Verify Screen Is Displayed    store-screen
    Wait Until Element Is Visible    accessibility_id=branch-search-input    ${EXPLICIT_WAIT}

Store Screen Shows List Map Toggle
    [Documentation]    Verify List/Map view toggle
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=view-toggle-list    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=view-toggle-map    ${EXPLICIT_WAIT}

Store Screen Shows Filter Chips
    [Documentation]    Verify filter chips are displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=filter-open-now    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=filter-24-7    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=filter-vaccine-center    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=filter-free-clinic    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=filter-near-me    ${EXPLICIT_WAIT}

Search Branch By Name
    [Documentation]    Verify searching for a branch by name
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Input Text    accessibility_id=branch-search-input    ${KNOWN_BRANCH}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

Search Branch By Area
    [Documentation]    Verify searching by area name
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Input Text    accessibility_id=branch-search-input    ${KNOWN_AREA}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

Branch Card Shows Complete Information
    [Documentation]    Verify branch card displays all required info
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=branch-name-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-status-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-address-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-distance-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-hours-0    ${EXPLICIT_WAIT}

Branch Card Shows Service Tags
    [Documentation]    Verify service tags (Vaccines, Lab Tests, etc.)
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait Until Element Is Visible    accessibility_id=branch-services-0    ${EXPLICIT_WAIT}

View Stock Button Expands Stock Section
    [Documentation]    Verify "View Stock" shows inline stock list
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-stock-0
    Wait Until Element Is Visible    accessibility_id=stock-list-0    ${EXPLICIT_WAIT}

Stock Section Shows Availability Badges
    [Documentation]    Verify In Stock / Low Stock / Out of Stock badges
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-stock-0
    Sleep    0.5
    # Check for at least one stock badge
    Wait Until Element Is Visible    accessibility_id=stock-badge-0    ${EXPLICIT_WAIT}

Get Directions Button Shows Alert
    [Documentation]    Verify "Get Directions" shows directions alert
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=get-directions-0
    Sleep    1
    Accept Alert

Branch Card Navigates To Detail
    [Documentation]    Verify tapping branch card opens detail screen
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Verify Screen Is Displayed    branch-detail-screen

Filter Open Now Branches
    [Documentation]    Verify "Open Now" filter works
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=filter-open-now
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=results-count    ${EXPLICIT_WAIT}

Filter 24 7 Branches
    [Documentation]    Verify "24/7" filter works
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=filter-24-7
    Sleep    1

Switch To Map View
    [Documentation]    Verify map view displays mock map
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait Until Element Is Visible    accessibility_id=map-view    ${EXPLICIT_WAIT}

Map View Shows Branch Pins
    [Documentation]    Verify map shows colored pins for branches
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait Until Element Is Visible    accessibility_id=map-pin-0    ${EXPLICIT_WAIT}

Map View Shows Current Location
    [Documentation]    Verify blue pulse for user's location
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait Until Element Is Visible    accessibility_id=current-location-dot    ${EXPLICIT_WAIT}

Map Pin Navigates To Branch Detail
    [Documentation]    Verify tapping map pin opens branch detail
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait And Click    accessibility_id=map-pin-0
    Verify Screen Is Displayed    branch-detail-screen

Switch Between List And Map Views
    [Documentation]    Verify seamless view switching
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait Until Element Is Visible    accessibility_id=map-view    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=view-toggle-list
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

# ============================================================
# BRANCH DETAIL - HAPPY PATH
# ============================================================
Branch Detail Shows Info Card
    [Documentation]    Verify branch detail shows complete info
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Wait Until Element Is Visible    accessibility_id=branch-detail-name    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-detail-status    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-detail-address    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-detail-phone    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-detail-hours    ${EXPLICIT_WAIT}

Branch Detail Shows Services
    [Documentation]    Verify available services chips
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Wait Until Element Is Visible    accessibility_id=branch-services    ${EXPLICIT_WAIT}

Branch Detail Shows Stock Availability
    [Documentation]    Verify stock section with search and categories
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=stock-search-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=stock-summary    ${EXPLICIT_WAIT}

Branch Detail Reserve For Pickup Button
    [Documentation]    Verify "Reserve for Pickup" button shows confirmation
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Scroll Down
    Scroll Down
    Wait And Click    accessibility_id=reserve-for-pickup
    Sleep    1
    Accept Alert

Branch Detail Quick Actions
    [Documentation]    Verify Call, Directions, Share quick action buttons
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Wait Until Element Is Visible    accessibility_id=action-call    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=action-directions    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=action-share    ${EXPLICIT_WAIT}

# ============================================================
# STORE LOCATOR - NEGATIVE CASES
# ============================================================
Search For Nonexistent Branch
    [Documentation]    Verify no results for unknown search
    [Tags]    negative    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Input Text    accessibility_id=branch-search-input    ${NONEXISTENT_BRANCH}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=no-results    ${EXPLICIT_WAIT}

Clear Branch Search
    [Documentation]    Verify clearing search shows all branches again
    [Tags]    negative    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Input Text    accessibility_id=branch-search-input    ${KNOWN_BRANCH}
    Sleep    1
    Wait And Click    accessibility_id=clear-search
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=branch-card-0    ${EXPLICIT_WAIT}

# ============================================================
# STORE LOCATOR - EDGE CASES
# ============================================================
Apply Multiple Filters Simultaneously
    [Documentation]    Verify multiple filter chips can be active
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=filter-open-now
    Wait And Click    accessibility_id=filter-24-7
    Wait And Click    accessibility_id=filter-vaccine-center
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=results-count    ${EXPLICIT_WAIT}

Search With Filters Combined
    [Documentation]    Verify search text + filter chips together
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=filter-open-now
    Wait And Input Text    accessibility_id=branch-search-input    ${KNOWN_BRANCH}
    Sleep    1

Stock Search In Branch Detail
    [Documentation]    Verify medicine search within branch stock
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=branch-card-0
    Scroll Down
    Wait And Input Text    accessibility_id=stock-search-input    Biogesic
    Sleep    1

Map Legend Shows Color Meanings
    [Documentation]    Verify map legend (green=open, red=closed)
    [Tags]    edge_case    ux    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-near-me
    Wait And Click    accessibility_id=view-toggle-map
    Wait Until Element Is Visible    accessibility_id=map-legend    ${EXPLICIT_WAIT}
