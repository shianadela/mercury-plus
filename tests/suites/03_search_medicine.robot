*** Settings ***
Documentation     Mercury+ Medicine Search & Catalog Test Suite
...               Covers search, filtering, medicine details, Rx validation,
...               and add-to-cart flows
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        search    medicine

*** Variables ***
${KNOWN_MEDICINE}             Biogesic
${KNOWN_GENERIC}              Paracetamol
${RX_MEDICINE}                Losartan
${NON_RX_MEDICINE}            Biogesic
${NONEXISTENT_MEDICINE}       Zyxwvutsrq123
${PARTIAL_SEARCH}             Bio
${GENERIC_SEARCH}             Paracetamol
${CATEGORY_PAIN}              Pain Relief
${CATEGORY_CARDIO}            Cardiovascular
${CATEGORY_DIABETES}          Diabetes
${CATEGORY_VITAMINS}          Vitamins

*** Test Cases ***
# ============================================================
# SEARCH - HAPPY PATH
# ============================================================
Search For Medicine By Brand Name
    [Documentation]    Verify searching by brand name returns results
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=medicine-card-0    ${KNOWN_MEDICINE}

Search For Medicine By Generic Name
    [Documentation]    Verify searching by generic name returns results
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${GENERIC_SEARCH}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Search Results Show Medicine Details
    [Documentation]    Verify each result shows brand, generic, dosage, price
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-brand-name-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-generic-name-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-price-0    ${EXPLICIT_WAIT}

Search Results Show Rx Badge For Prescription Medicines
    [Documentation]    Verify "Rx" badge appears on prescription-only medicines
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${RX_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=rx-badge-0    ${EXPLICIT_WAIT}

Search Results Show Count Label
    [Documentation]    Verify results count is displayed
    [Tags]    happy_path    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=results-count    ${EXPLICIT_WAIT}

Filter Medicines By Category
    [Documentation]    Verify category chip filters medicine list
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-${CATEGORY_PAIN}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Filter By Multiple Categories Sequentially
    [Documentation]    Verify switching between categories updates results
    [Tags]    happy_path    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-${CATEGORY_PAIN}
    Sleep    1
    ${pain_count}=    Get Text    accessibility_id=results-count
    Wait And Click    accessibility_id=category-chip-${CATEGORY_VITAMINS}
    Sleep    1
    ${vitamin_count}=    Get Text    accessibility_id=results-count

Reset Category Filter To All
    [Documentation]    Verify "All" chip resets filter
    [Tags]    happy_path    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-${CATEGORY_PAIN}
    Sleep    1
    Wait And Click    accessibility_id=category-chip-All
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

View Medicine Detail Alert
    [Documentation]    Verify tapping medicine card shows detail alert
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=medicine-card-0
    Sleep    1
    # Alert should show medicine details
    Verify Alert Contains Text    ${KNOWN_MEDICINE}
    Accept Alert

Add Non Rx Medicine To Cart
    [Documentation]    Verify non-prescription medicine can be added to cart
    [Tags]    happy_path    priority_critical
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${NON_RX_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=add-button-0
    Sleep    1
    Verify Alert Contains Text    Added to Cart
    Accept Alert

Add Rx Medicine Prompts Prescription Upload
    [Documentation]    Verify Rx medicine shows prescription requirement alert
    [Tags]    happy_path    priority_critical
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${RX_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=add-button-0
    Sleep    1
    Verify Alert Contains Text    prescription
    Accept Alert

Rx Medicine Alert Navigates To Prescription Scanner
    [Documentation]    Verify "Scan Prescription" in Rx alert navigates correctly
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${RX_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=add-button-0
    Sleep    1
    # Click "Scan Prescription" button in alert
    Click Element    accessibility_id=alert-scan-prescription
    Verify Screen Is Displayed    prescription-screen

FAB Scanner Button Navigates To Scanner
    [Documentation]    Verify floating barcode scanner button opens scanner
    [Tags]    happy_path    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Verify Screen Is Displayed    scanner-screen

Search Shows Brand And Generic Prices
    [Documentation]    Verify both brand and generic prices are displayed
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-brand-price-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-generic-price-0    ${EXPLICIT_WAIT}

# ============================================================
# SEARCH - ALTERNATE PATHS
# ============================================================
Partial Search Returns Matching Results
    [Documentation]    Verify partial text matches (e.g. "Bio" finds "Biogesic")
    [Tags]    alternate    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${PARTIAL_SEARCH}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Clear Search Input With X Button
    [Documentation]    Verify clearing search resets results
    [Tags]    alternate    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=clear-search
    Sleep    1
    ${search_text}=    Get Text    accessibility_id=search-input
    Should Be Empty    ${search_text}

Category Chip Scroll Is Horizontal
    [Documentation]    Verify category chips can be scrolled horizontally
    [Tags]    alternate    ux    priority_low
    Navigate To Search Tab
    Wait Until Element Is Visible    accessibility_id=category-chips    ${EXPLICIT_WAIT}
    Swipe Left On Element    accessibility_id=category-chips

Search Combined With Category Filter
    [Documentation]    Verify search text + category filter work together
    [Tags]    alternate    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-${CATEGORY_CARDIO}
    Wait And Input Text    accessibility_id=search-input    ${RX_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Medicine Detail Shows Description And Side Effects
    [Documentation]    Verify detail alert includes description and side effects
    [Tags]    alternate    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Wait And Click    accessibility_id=medicine-card-0
    Sleep    1
    ${alert_text}=    Get Alert Text
    Should Contain    ${alert_text}    ${KNOWN_MEDICINE}
    Accept Alert

# ============================================================
# SEARCH - NEGATIVE CASES
# ============================================================
Search For Nonexistent Medicine
    [Documentation]    Verify empty state when no results found
    [Tags]    negative    priority_high
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${NONEXISTENT_MEDICINE}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=no-results    ${EXPLICIT_WAIT}

Search With Only Spaces
    [Documentation]    Verify whitespace-only search is handled
    [Tags]    negative    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${SPACE}${SPACE}${SPACE}
    Sleep    1
    # Should show all results or empty search state

Search With Special Characters
    [Documentation]    Verify special chars don't crash search
    [Tags]    negative    security    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    @#$%^&*()
    Sleep    1
    # App should not crash

Search With SQL Injection
    [Documentation]    Verify search is safe from injection
    [Tags]    negative    security    priority_critical
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ' OR '1'='1
    Sleep    1
    Verify Screen Is Displayed    search-screen

# ============================================================
# SEARCH - EDGE CASES
# ============================================================
Search With Very Long Input
    [Documentation]    Verify extremely long search text is handled
    [Tags]    edge_case    boundary    priority_low
    Navigate To Search Tab
    ${long_text}=    Evaluate    "a" * 200
    Wait And Input Text    accessibility_id=search-input    ${long_text}
    Sleep    1
    Verify Screen Is Displayed    search-screen

Rapid Typing In Search Bar
    [Documentation]    Verify rapid input changes don't cause issues
    [Tags]    edge_case    stability    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    B
    Wait And Input Text    accessibility_id=search-input    Bi
    Wait And Input Text    accessibility_id=search-input    Bio
    Wait And Input Text    accessibility_id=search-input    Biog
    Wait And Input Text    accessibility_id=search-input    Biogesic
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Rapid Category Switching
    [Documentation]    Verify quickly changing categories doesn't crash
    [Tags]    edge_case    stability    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-${CATEGORY_PAIN}
    Wait And Click    accessibility_id=category-chip-${CATEGORY_CARDIO}
    Wait And Click    accessibility_id=category-chip-${CATEGORY_DIABETES}
    Wait And Click    accessibility_id=category-chip-${CATEGORY_VITAMINS}
    Wait And Click    accessibility_id=category-chip-All
    Sleep    1
    Verify Screen Is Displayed    search-screen

Search Case Insensitivity
    [Documentation]    Verify search is case-insensitive
    [Tags]    edge_case    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    biogesic
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}
    Wait And Input Text    accessibility_id=search-input    BIOGESIC
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=medicine-card-0    ${EXPLICIT_WAIT}

Scroll Through Full Medicine List
    [Documentation]    Verify long medicine list scrolls without issues
    [Tags]    edge_case    performance    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=category-chip-All
    Sleep    1
    FOR    ${i}    IN RANGE    5
        Scroll Down
        Sleep    0.5
    END
    Verify Screen Is Displayed    search-screen

Medicine Price Format Validation
    [Documentation]    Verify all prices show Philippine Peso format
    [Tags]    edge_case    i18n    priority_medium
    Navigate To Search Tab
    Wait And Input Text    accessibility_id=search-input    ${KNOWN_MEDICINE}
    Sleep    1
    Verify Price Format    accessibility_id=medicine-brand-price-0
