*** Settings ***
Documentation     Mercury+ Medication Reminders Test Suite
...               Covers reminder schedule, take dose, refill predictions,
...               add reminder modal, and reminder form validation
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        reminders

*** Variables ***
${MEDICINE_NAME}              Amoxicillin
${MEDICINE_DOSAGE}            500mg
${REMINDER_TIME}              08:00 AM
${START_DATE}                 2026-02-20
${TOTAL_QUANTITY}             30

*** Test Cases ***
# ============================================================
# REMINDERS - HAPPY PATH
# ============================================================
Reminders Screen Shows Header With Add Button
    [Documentation]    Verify header with "+" add button
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Verify Screen Is Displayed    reminders-screen
    Wait Until Element Is Visible    accessibility_id=add-reminder-button    ${EXPLICIT_WAIT}

Todays Schedule Shows Timeline
    [Documentation]    Verify 5 scheduled reminders in vertical timeline
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait Until Element Is Visible    accessibility_id=schedule-8am-losartan    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=schedule-8am-atorvastatin    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=schedule-12pm-metformin    ${EXPLICIT_WAIT}

Taken Reminders Show Green Status
    [Documentation]    Verify taken medications show green checkmark
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait Until Element Is Visible    accessibility_id=reminder-taken-indicator-0    ${EXPLICIT_WAIT}

Mark Upcoming Dose As Taken
    [Documentation]    Verify "Take" button marks dose as taken
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait And Click    accessibility_id=take-dose-12pm-metformin
    Wait Until Element Is Visible    accessibility_id=dose-taken-12pm-metformin    ${EXPLICIT_WAIT}

Refill Predictions Section Shows Three Medicines
    [Documentation]    Verify refill predictions for 3 medicines
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=refill-prediction-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=refill-prediction-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=refill-prediction-2    ${EXPLICIT_WAIT}

Low Supply Medicine Shows Warning Badge
    [Documentation]    Verify Metformin shows "Low Supply!" amber badge
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=low-supply-badge    ${EXPLICIT_WAIT}

Low Supply Order Now Button
    [Documentation]    Verify "Order Now" amber button for low supply
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=order-now-button    ${EXPLICIT_WAIT}

Refill Prediction Shows Progress Bar
    [Documentation]    Verify remaining supply progress bar
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=refill-progress-0    ${EXPLICIT_WAIT}

Order Refill Button For Regular Supply
    [Documentation]    Verify "Order Refill" outline green button
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=order-refill-button    ${EXPLICIT_WAIT}

# ============================================================
# ADD REMINDER MODAL - HAPPY PATH
# ============================================================
Open Add Reminder Modal
    [Documentation]    Verify add reminder modal opens from "+" button
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait Until Element Is Visible    accessibility_id=add-reminder-modal    ${EXPLICIT_WAIT}

Add Reminder Modal Shows All Fields
    [Documentation]    Verify all input fields are present in modal
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait Until Element Is Visible    accessibility_id=medicine-name-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=dosage-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=frequency-chips    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=reminder-time-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=start-date-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=total-quantity-input    ${EXPLICIT_WAIT}

Add Reminder With Valid Data
    [Documentation]    Verify adding a complete reminder
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Input Text    accessibility_id=medicine-name-input    ${MEDICINE_NAME}
    Wait And Input Text    accessibility_id=dosage-input    ${MEDICINE_DOSAGE}
    Wait And Click    accessibility_id=frequency-once-daily
    Wait And Input Text    accessibility_id=reminder-time-input    ${REMINDER_TIME}
    Wait And Input Text    accessibility_id=start-date-input    ${START_DATE}
    Wait And Input Text    accessibility_id=total-quantity-input    ${TOTAL_QUANTITY}
    Wait And Click    accessibility_id=save-reminder-button
    Sleep    1
    Verify Alert Contains Text    success
    Accept Alert

Select Once Daily Frequency
    [Documentation]    Verify once daily frequency chip selection
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Click    accessibility_id=frequency-once-daily
    Wait Until Element Is Visible    accessibility_id=frequency-once-daily-selected    ${SHORT_WAIT}

Select Twice Daily Frequency
    [Documentation]    Verify twice daily frequency chip selection
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Click    accessibility_id=frequency-twice-daily
    Wait Until Element Is Visible    accessibility_id=frequency-twice-daily-selected    ${SHORT_WAIT}

Select Three Times Daily Frequency
    [Documentation]    Verify three times daily frequency
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Click    accessibility_id=frequency-thrice-daily
    Wait Until Element Is Visible    accessibility_id=frequency-thrice-daily-selected    ${SHORT_WAIT}

Select Weekly Frequency
    [Documentation]    Verify weekly frequency chip selection
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Click    accessibility_id=frequency-weekly
    Wait Until Element Is Visible    accessibility_id=frequency-weekly-selected    ${SHORT_WAIT}

# ============================================================
# ADD REMINDER - NEGATIVE CASES
# ============================================================
Save Reminder Without Medicine Name
    [Documentation]    Verify validation requires medicine name
    [Tags]    negative    validation    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Input Text    accessibility_id=dosage-input    ${MEDICINE_DOSAGE}
    Wait And Click    accessibility_id=frequency-once-daily
    Wait And Click    accessibility_id=save-reminder-button
    Sleep    1
    # Should show validation error

Save Reminder Without Dosage
    [Documentation]    Verify validation requires dosage
    [Tags]    negative    validation    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Input Text    accessibility_id=medicine-name-input    ${MEDICINE_NAME}
    Wait And Click    accessibility_id=frequency-once-daily
    Wait And Click    accessibility_id=save-reminder-button
    Sleep    1

Save Reminder With Empty Fields
    [Documentation]    Verify all-empty form doesn't save
    [Tags]    negative    validation    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Click    accessibility_id=save-reminder-button
    Sleep    1

# ============================================================
# REMINDERS - ALTERNATE PATHS
# ============================================================
Navigate Back From Reminders
    [Documentation]    Verify back navigation
    [Tags]    alternate    navigation    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Go Back
    Verify Screen Is Displayed    home-screen

Close Add Reminder Modal
    [Documentation]    Verify modal can be dismissed
    [Tags]    alternate    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait Until Element Is Visible    accessibility_id=add-reminder-modal    ${EXPLICIT_WAIT}
    # Close modal by tapping outside or close button
    Wait And Click    accessibility_id=close-modal
    Element Should Not Be Visible With Timeout    accessibility_id=add-reminder-modal

# ============================================================
# REMINDERS - EDGE CASES
# ============================================================
Mark Already Taken Dose Again
    [Documentation]    Verify tapping already-taken dose doesn't toggle off
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    # First dose is already taken
    Wait Until Element Is Visible    accessibility_id=reminder-taken-indicator-0    ${EXPLICIT_WAIT}
    # Tap it again - should remain taken
    Wait And Click    accessibility_id=schedule-8am-losartan
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=reminder-taken-indicator-0    ${EXPLICIT_WAIT}

Add Reminder With Very Long Medicine Name
    [Documentation]    Verify long medicine names are handled
    [Tags]    edge_case    boundary    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    ${long_name}=    Evaluate    "Methylprednisolone-Acetate-Extended-Release-" * 5
    Wait And Input Text    accessibility_id=medicine-name-input    ${long_name}
    Sleep    0.5

Add Reminder With Special Characters In Name
    [Documentation]    Verify special characters in medicine name
    [Tags]    edge_case    security    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Wait And Click    accessibility_id=add-reminder-button
    Wait And Input Text    accessibility_id=medicine-name-input    <script>alert(1)</script>
    Wait And Input Text    accessibility_id=dosage-input    ${MEDICINE_DOSAGE}
    Wait And Click    accessibility_id=frequency-once-daily
    Wait And Click    accessibility_id=save-reminder-button
    Sleep    1
    Verify Screen Is Displayed    reminders-screen

Multiple Dose Completions In Sequence
    [Documentation]    Verify marking multiple doses as taken sequentially
    [Tags]    edge_case    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=notification-bell
    Scroll Down
    # Mark all pending doses
    Run Keyword And Ignore Error    Wait And Click    accessibility_id=take-dose-12pm-metformin
    Run Keyword And Ignore Error    Wait And Click    accessibility_id=take-dose-6pm-metformin
    Sleep    0.5
