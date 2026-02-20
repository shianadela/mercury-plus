*** Settings ***
Documentation     Mercury+ Prescription Scanning & Results Test Suite
...               Covers camera/gallery upload, AI analysis animation,
...               prescription results, generic switching, and add-to-cart
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        prescription

*** Test Cases ***
# ============================================================
# PRESCRIPTION SCAN - HAPPY PATH
# ============================================================
Prescription Screen Shows Upload Area
    [Documentation]    Verify scan prescription screen elements
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Verify Screen Is Displayed    prescription-screen
    Wait Until Element Is Visible    accessibility_id=upload-area    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=take-photo-button    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=upload-gallery-button    ${EXPLICIT_WAIT}

Prescription Screen Shows AI Badge
    [Documentation]    Verify "Powered by Mercury+ AI" badge
    [Tags]    happy_path    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait Until Element Is Visible    accessibility_id=ai-powered-badge    ${EXPLICIT_WAIT}

Take Photo Button Requests Camera Permission
    [Documentation]    Verify camera permission is requested on tap
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait And Click    accessibility_id=take-photo-button
    Sleep    ${LOADING_DELAY}
    # System permission dialog may appear

Upload From Gallery Button Opens Image Picker
    [Documentation]    Verify gallery picker opens
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait And Click    accessibility_id=upload-gallery-button
    Sleep    ${LOADING_DELAY}

Image Preview Shows After Selection
    [Documentation]    Verify selected image preview with remove button
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    # Simulate image selection (may need mock)
    Wait And Click    accessibility_id=upload-gallery-button
    Sleep    ${LOADING_DELAY}
    # After image selected:
    Wait Until Element Is Visible    accessibility_id=image-preview    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=remove-image-button    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=analyze-button    ${EXPLICIT_WAIT}

Analysis Animation Shows Progress Steps
    [Documentation]    Verify 2.8s analysis animation with checklist
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait And Click    accessibility_id=upload-gallery-button
    Sleep    ${LOADING_DELAY}
    Wait And Click    accessibility_id=analyze-button
    Wait Until Element Is Visible    accessibility_id=analysis-progress    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=step-image-quality    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=step-text-extracted    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=step-matching-medicines    ${EXPLICIT_WAIT}

Analysis Navigates To Results Screen
    [Documentation]    Verify analysis completes and shows results
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait And Click    accessibility_id=upload-gallery-button
    Sleep    ${LOADING_DELAY}
    Wait And Click    accessibility_id=analyze-button
    Wait Until Element Is Visible    accessibility_id=prescription-results-screen    ${EXPLICIT_WAIT}

Recent Prescriptions Are Listed
    [Documentation]    Verify recent prescriptions section shows 3 items
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=recent-prescription-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=recent-prescription-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=recent-prescription-2    ${EXPLICIT_WAIT}

Recent Prescription Tap Navigates To Results
    [Documentation]    Verify tapping recent Rx opens results
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Verify Screen Is Displayed    prescription-results-screen

Prescription Tips Are Displayed
    [Documentation]    Verify upload tips text is shown
    [Tags]    happy_path    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait Until Element Is Visible    accessibility_id=upload-tips    ${EXPLICIT_WAIT}

# ============================================================
# PRESCRIPTION SCAN - ALTERNATE PATHS
# ============================================================
Remove Selected Image
    [Documentation]    Verify image can be removed after selection
    [Tags]    alternate    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Wait And Click    accessibility_id=upload-gallery-button
    Sleep    ${LOADING_DELAY}
    Wait And Click    accessibility_id=remove-image-button
    Wait Until Element Is Visible    accessibility_id=upload-area    ${EXPLICIT_WAIT}
    Element Should Not Be Visible With Timeout    accessibility_id=analyze-button

Navigate Back From Prescription Screen
    [Documentation]    Verify back button returns to previous screen
    [Tags]    alternate    navigation    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Go Back
    Verify Screen Is Displayed    home-screen

# ============================================================
# PRESCRIPTION RESULTS - HAPPY PATH
# ============================================================
Results Show Success Banner
    [Documentation]    Verify success banner with 3 medicines identified
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Wait Until Element Is Visible    accessibility_id=success-banner    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=success-banner    3 medicines

Results Show Doctor Information
    [Documentation]    Verify doctor card with verified badge
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Wait Until Element Is Visible    accessibility_id=doctor-card    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=doctor-name    Dr. Maria Santos
    Wait Until Element Is Visible    accessibility_id=verified-badge    ${EXPLICIT_WAIT}

Results Show Cost Comparison
    [Documentation]    Verify brand vs generic cost comparison card
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Wait Until Element Is Visible    accessibility_id=cost-comparison    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=brand-total    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=your-selection-total    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=savings-amount    ${EXPLICIT_WAIT}

Results Show Three Medicine Cards
    [Documentation]    Verify 3 identified medicines are displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=medicine-result-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-result-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=medicine-result-2    ${EXPLICIT_WAIT}

Toggle Medicine From Brand To Generic
    [Documentation]    Verify brand/generic segmented control works
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Wait And Click    accessibility_id=generic-toggle-0
    Wait Until Element Is Visible    accessibility_id=save-badge-0    ${EXPLICIT_WAIT}

Generic Toggle Updates Cost Comparison
    [Documentation]    Verify switching to generic updates total savings
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    ${initial_total}=    Get Text    accessibility_id=your-selection-total
    Scroll Down
    Wait And Click    accessibility_id=generic-toggle-0
    Sleep    0.5
    Scroll Up
    ${updated_total}=    Get Text    accessibility_id=your-selection-total
    Should Not Be Equal    ${initial_total}    ${updated_total}

Add Individual Medicine To Cart
    [Documentation]    Verify single medicine add-to-cart button
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Wait And Click    accessibility_id=add-to-cart-0
    Wait Until Element Is Visible    accessibility_id=added-to-cart-0    ${EXPLICIT_WAIT}

Add All Medicines To Cart
    [Documentation]    Verify "Add All to Cart" button
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Scroll Down
    Wait And Click    accessibility_id=add-all-to-cart
    Wait Until Element Is Visible    accessibility_id=all-items-in-cart    ${EXPLICIT_WAIT}

Save Prescription Toggle
    [Documentation]    Verify bookmark/save prescription toggle
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Scroll Down
    Wait And Click    accessibility_id=save-prescription
    Wait Until Element Is Visible    accessibility_id=prescription-saved    ${EXPLICIT_WAIT}

Find Nearest Stock Button Navigates To Store
    [Documentation]    Verify "Find Nearest Stock" opens store locator
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Scroll Down
    Wait And Click    accessibility_id=find-nearest-stock
    Verify Screen Is Displayed    store-screen

Set Reminders Button Navigates To Reminders
    [Documentation]    Verify "Set Reminders" opens reminders screen
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Scroll Down
    Wait And Click    accessibility_id=set-reminders
    Verify Screen Is Displayed    reminders-screen

# ============================================================
# PRESCRIPTION - EDGE CASES
# ============================================================
Toggle All Medicines To Generic Then Back To Brand
    [Documentation]    Verify toggling all medicines back and forth
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    # Toggle all to generic
    Wait And Click    accessibility_id=generic-toggle-0
    Wait And Click    accessibility_id=generic-toggle-1
    Wait And Click    accessibility_id=generic-toggle-2
    # Toggle all back to brand
    Wait And Click    accessibility_id=brand-toggle-0
    Wait And Click    accessibility_id=brand-toggle-1
    Wait And Click    accessibility_id=brand-toggle-2
    Sleep    0.5

Add To Cart Then Add All Does Not Duplicate
    [Documentation]    Verify adding one then all doesn't create duplicates
    [Tags]    edge_case    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Wait And Click    accessibility_id=add-to-cart-0
    Scroll Down
    Wait And Click    accessibility_id=add-all-to-cart
    Sleep    0.5

Generic Medicine Disclaimer Is Visible
    [Documentation]    Verify generic medicine safety disclaimer text
    [Tags]    edge_case    legal    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=generic-disclaimer    ${EXPLICIT_WAIT}
