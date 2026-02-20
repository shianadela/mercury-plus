*** Settings ***
Documentation     Mercury+ Barcode/Price Scanner Test Suite
...               Covers scanner UI, manual barcode entry, demo mode,
...               and price comparison results
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        scanner

*** Test Cases ***
# ============================================================
# SCANNER - HAPPY PATH
# ============================================================
Scanner Screen Opens As Modal
    [Documentation]    Verify scanner opens with dark camera-style UI
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Verify Screen Is Displayed    scanner-screen
    Wait Until Element Is Visible    accessibility_id=scanner-viewfinder    ${EXPLICIT_WAIT}

Scanner Shows Close Button
    [Documentation]    Verify X close button is visible
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait Until Element Is Visible    accessibility_id=close-scanner    ${EXPLICIT_WAIT}

Scanner Shows Animated Scanning Line
    [Documentation]    Verify green scanning line animation
    [Tags]    happy_path    ux    priority_low
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait Until Element Is Visible    accessibility_id=scan-line    ${EXPLICIT_WAIT}

Manual Barcode Entry Button Toggles Input
    [Documentation]    Verify manual entry field appears on tap
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=manual-barcode-button
    Wait Until Element Is Visible    accessibility_id=barcode-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=barcode-search-button    ${EXPLICIT_WAIT}

Demo Barcode Shows Loading Then Results
    [Documentation]    Verify demo barcode triggers result panel
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-loading    ${SHORT_WAIT}
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}

Result Panel Shows Product Info
    [Documentation]    Verify scanned product displays Biogesic details
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=result-product-name    Biogesic
    Wait Until Element Is Visible    accessibility_id=result-brand-price    ${EXPLICIT_WAIT}

Result Panel Shows Generic Alternative
    [Documentation]    Verify generic alternative card with savings
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=generic-alternative    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=generic-price    ₱3.00
    Wait Until Element Is Visible    accessibility_id=save-percentage-badge    ${EXPLICIT_WAIT}

Result Panel Shows Branch Price Comparison
    [Documentation]    Verify branch price comparison with "Best Price" badge
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-price-makati    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-price-bgc    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=branch-price-glorietta    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=best-price-badge    ${EXPLICIT_WAIT}

Result Panel Add To Cart Navigates Back
    [Documentation]    Verify "Add to Cart" closes scanner
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=result-add-to-cart
    Verify Screen Is Displayed    search-screen

Result Panel Find In Store Navigates Back
    [Documentation]    Verify "Find in Store" closes scanner
    [Tags]    happy_path    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait Until Element Is Visible    accessibility_id=scan-result-panel    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=result-find-in-store
    Verify Screen Is Displayed    search-screen

Close Scanner Returns To Previous Screen
    [Documentation]    Verify X button closes scanner
    [Tags]    happy_path    priority_high
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=close-scanner
    Verify Screen Is Displayed    search-screen

# ============================================================
# SCANNER - NEGATIVE CASES
# ============================================================
Manual Barcode Search With Empty Input
    [Documentation]    Verify empty barcode search is handled
    [Tags]    negative    validation    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=manual-barcode-button
    Wait And Click    accessibility_id=barcode-search-button
    Sleep    1

Manual Barcode With Non Numeric Input
    [Documentation]    Verify non-numeric barcode is handled
    [Tags]    negative    validation    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=manual-barcode-button
    Wait And Input Text    accessibility_id=barcode-input    abcdef
    Wait And Click    accessibility_id=barcode-search-button
    Sleep    1

Manual Barcode With Invalid Barcode Number
    [Documentation]    Verify non-matching barcode shows appropriate feedback
    [Tags]    negative    priority_medium
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=manual-barcode-button
    Wait And Input Text    accessibility_id=barcode-input    0000000000000
    Wait And Click    accessibility_id=barcode-search-button
    Sleep    1

# ============================================================
# SCANNER - EDGE CASES
# ============================================================
Manual Barcode With Very Long Input
    [Documentation]    Verify extremely long barcode input is handled
    [Tags]    edge_case    boundary    priority_low
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=manual-barcode-button
    ${long_barcode}=    Evaluate    "1" * 100
    Wait And Input Text    accessibility_id=barcode-input    ${long_barcode}
    Wait And Click    accessibility_id=barcode-search-button
    Sleep    1
    Verify Screen Is Displayed    scanner-screen

Double Tap Demo Barcode Button
    [Documentation]    Verify double-tapping demo doesn't cause issues
    [Tags]    edge_case    stability    priority_low
    Navigate To Search Tab
    Wait And Click    accessibility_id=scanner-fab
    Wait And Click    accessibility_id=demo-barcode-button
    Wait And Click    accessibility_id=demo-barcode-button
    Sleep    ${LOADING_DELAY}
    Verify Screen Is Displayed    scanner-screen
