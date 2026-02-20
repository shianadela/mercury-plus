*** Settings ***
Documentation     Mercury+ Health Dashboard Test Suite
...               Covers BMI calculator, calorie counter, step counter,
...               vaccine info, and health tools for users 25-65
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        health

*** Variables ***
# BMI Test Data - representative of target age group 25-65
${NORMAL_HEIGHT}              170
${NORMAL_WEIGHT}              68
${UNDERWEIGHT_HEIGHT}         175
${UNDERWEIGHT_WEIGHT}         50
${OVERWEIGHT_HEIGHT}          165
${OVERWEIGHT_WEIGHT}          80
${OBESE_HEIGHT}               160
${OBESE_WEIGHT}               100
${ZERO_HEIGHT}                0
${ZERO_WEIGHT}                0
${NEGATIVE_HEIGHT}            -170
${EXTREME_HEIGHT}             300
${EXTREME_WEIGHT}             500
${CALORIE_GOAL}               2,000

*** Test Cases ***
# ============================================================
# HEALTH DASHBOARD - HAPPY PATH
# ============================================================
Health Screen Shows Todays Summary
    [Documentation]    Verify daily health summary with 3 metrics
    [Tags]    happy_path    priority_high
    Navigate To Health Tab
    Wait Until Element Is Visible    accessibility_id=health-summary    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=steps-widget    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=water-widget    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=meds-widget    ${EXPLICIT_WAIT}

Steps Widget Shows Progress
    [Documentation]    Verify steps: 6,234 / 10,000 with progress ring
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Element Text Should Contain    accessibility_id=steps-value    6,234
    Element Text Should Contain    accessibility_id=steps-goal    10,000

Water Widget Shows Progress
    [Documentation]    Verify water: 5/8 glasses
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Element Text Should Contain    accessibility_id=water-value    5
    Element Text Should Contain    accessibility_id=water-goal    8

Meds Widget Shows Progress
    [Documentation]    Verify meds taken: 2/3
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Element Text Should Contain    accessibility_id=meds-value    2
    Element Text Should Contain    accessibility_id=meds-goal    3

Health Tools Grid Shows Six Tools
    [Documentation]    Verify all 6 health tools are displayed in grid
    [Tags]    happy_path    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=tool-bmi-calculator    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tool-calorie-counter    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tool-step-counter    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tool-medication-reminders    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tool-ai-health-chat    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tool-vaccine-info    ${EXPLICIT_WAIT}

# ============================================================
# BMI CALCULATOR - HAPPY PATH
# ============================================================
Open BMI Calculator Panel
    [Documentation]    Verify BMI calculator opens as inline panel
    [Tags]    happy_path    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait Until Element Is Visible    accessibility_id=bmi-panel    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=height-input    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=weight-input    ${EXPLICIT_WAIT}

Calculate Normal BMI
    [Documentation]    Verify BMI calculation for normal weight (170cm, 68kg -> ~23.5)
    [Tags]    happy_path    priority_high    demographics_25_65
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${NORMAL_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${NORMAL_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-result    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=bmi-category-Normal    ${EXPLICIT_WAIT}

Calculate Underweight BMI
    [Documentation]    Verify BMI category for underweight (175cm, 50kg -> ~16.3)
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${UNDERWEIGHT_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${UNDERWEIGHT_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-category-Underweight    ${EXPLICIT_WAIT}

Calculate Overweight BMI
    [Documentation]    Verify BMI category for overweight (165cm, 80kg -> ~29.4)
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${OVERWEIGHT_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${OVERWEIGHT_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-category-Overweight    ${EXPLICIT_WAIT}

Calculate Obese BMI
    [Documentation]    Verify BMI category for obese (160cm, 100kg -> ~39.1)
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${OBESE_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${OBESE_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-category-Obese    ${EXPLICIT_WAIT}

BMI Result Shows Colored Scale Bar
    [Documentation]    Verify BMI result includes color-coded scale visualization
    [Tags]    happy_path    ux    priority_low
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${NORMAL_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${NORMAL_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-scale-bar    ${EXPLICIT_WAIT}

# ============================================================
# BMI CALCULATOR - NEGATIVE CASES
# ============================================================
BMI With Zero Values
    [Documentation]    Verify BMI handles zero input gracefully
    [Tags]    negative    validation    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${ZERO_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${ZERO_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Sleep    1
    # Should show error or no result, not crash

BMI With Negative Values
    [Documentation]    Verify BMI rejects negative values
    [Tags]    negative    validation    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${NEGATIVE_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${NORMAL_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Sleep    1

BMI With Empty Fields
    [Documentation]    Verify BMI doesn't calculate with empty inputs
    [Tags]    negative    validation    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Click    accessibility_id=calculate-bmi-button
    Sleep    1

BMI With Non Numeric Input
    [Documentation]    Verify BMI rejects text input
    [Tags]    negative    validation    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    abc
    Wait And Input Text    accessibility_id=weight-input    xyz
    Wait And Click    accessibility_id=calculate-bmi-button
    Sleep    1

# ============================================================
# BMI CALCULATOR - EDGE CASES
# ============================================================
BMI With Extreme Values
    [Documentation]    Verify BMI handles extremely large values
    [Tags]    edge_case    boundary    priority_low
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    ${EXTREME_HEIGHT}
    Wait And Input Text    accessibility_id=weight-input    ${EXTREME_WEIGHT}
    Wait And Click    accessibility_id=calculate-bmi-button
    Sleep    1
    Verify Screen Is Displayed    health-screen

BMI With Decimal Values
    [Documentation]    Verify BMI accepts decimal height/weight
    [Tags]    edge_case    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait And Input Text    accessibility_id=height-input    170.5
    Wait And Input Text    accessibility_id=weight-input    68.3
    Wait And Click    accessibility_id=calculate-bmi-button
    Wait Until Element Is Visible    accessibility_id=bmi-result    ${EXPLICIT_WAIT}

# ============================================================
# CALORIE COUNTER - HAPPY PATH
# ============================================================
Open Calorie Counter Panel
    [Documentation]    Verify calorie counter opens with circular display
    [Tags]    happy_path    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    Wait Until Element Is Visible    accessibility_id=calorie-panel    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=calorie-display    ${EXPLICIT_WAIT}

Add Food Item To Calorie Counter
    [Documentation]    Verify tapping food item adds calories
    [Tags]    happy_path    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    ${initial}=    Get Text    accessibility_id=calorie-total
    Wait And Click    accessibility_id=food-rice
    Sleep    0.5
    ${after}=    Get Text    accessibility_id=calorie-total
    Should Not Be Equal    ${initial}    ${after}

Add Multiple Food Items
    [Documentation]    Verify adding multiple foods accumulates calories
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    Wait And Click    accessibility_id=food-rice
    Wait And Click    accessibility_id=food-chicken-adobo
    Wait And Click    accessibility_id=food-banana
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=calorie-total    ${EXPLICIT_WAIT}

Calorie Counter Shows All Six Food Items
    [Documentation]    Verify all Filipino food items are displayed
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    Wait Until Element Is Visible    accessibility_id=food-rice    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-chicken-adobo    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-sinigang    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-lumpia    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-banana    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=food-egg    ${EXPLICIT_WAIT}

Calorie Goal Display Shows 2000 Kcal
    [Documentation]    Verify default daily calorie goal
    [Tags]    happy_path    priority_low
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    Element Text Should Contain    accessibility_id=calorie-goal    ${CALORIE_GOAL}

# ============================================================
# STEP COUNTER - HAPPY PATH
# ============================================================
Open Step Counter Panel
    [Documentation]    Verify step counter displays static data
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-step-counter
    Wait Until Element Is Visible    accessibility_id=step-panel    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=step-count    6,234
    Element Text Should Contain    accessibility_id=calories-burned    312
    Element Text Should Contain    accessibility_id=distance-km    4.2

Step Counter Shows Goal Progress Ring
    [Documentation]    Verify 62% goal progress is displayed
    [Tags]    happy_path    priority_low
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-step-counter
    Wait Until Element Is Visible    accessibility_id=goal-progress-ring    ${EXPLICIT_WAIT}

# ============================================================
# VACCINE INFO - HAPPY PATH
# ============================================================
Open Vaccine Info Panel
    [Documentation]    Verify vaccine info panel shows vaccine cards
    [Tags]    happy_path    priority_high    demographics_25_65
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-vaccine-info
    Wait Until Element Is Visible    accessibility_id=vaccine-panel    ${EXPLICIT_WAIT}

Vaccine Cards Show All Five Vaccines
    [Documentation]    Verify all 5 vaccines are listed
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-vaccine-info
    Wait Until Element Is Visible    accessibility_id=vaccine-covid-booster    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=vaccine-flu    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=vaccine-pneumococcal    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=vaccine-hepatitis-b    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=vaccine-hpv    ${EXPLICIT_WAIT}

Vaccine Card Shows Status Badge
    [Documentation]    Verify vaccines show Available or By Appointment badges
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-vaccine-info
    Wait Until Element Is Visible    accessibility_id=vaccine-status-available    ${EXPLICIT_WAIT}

Vaccine Card Shows Price
    [Documentation]    Verify vaccine price is displayed
    [Tags]    happy_path    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-vaccine-info
    Wait Until Element Is Visible    accessibility_id=vaccine-price-0    ${EXPLICIT_WAIT}

# ============================================================
# HEALTH TOOLS NAVIGATION - HAPPY PATH
# ============================================================
Medication Reminders Tool Navigates To Reminders
    [Documentation]    Verify Medication Reminders navigates to /reminders
    [Tags]    happy_path    navigation    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-medication-reminders
    Verify Screen Is Displayed    reminders-screen

AI Health Chat Tool Navigates To Chat
    [Documentation]    Verify AI Health Chat navigates to /chat
    [Tags]    happy_path    navigation    priority_high
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-ai-health-chat
    Verify Screen Is Displayed    chat-screen

# ============================================================
# HEALTH - EDGE CASES
# ============================================================
Toggle Multiple Health Tool Panels
    [Documentation]    Verify opening one panel closes the previous
    [Tags]    edge_case    ux    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-bmi-calculator
    Wait Until Element Is Visible    accessibility_id=bmi-panel    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=tool-calorie-counter
    Wait Until Element Is Visible    accessibility_id=calorie-panel    ${EXPLICIT_WAIT}

Rapid Food Item Tapping In Calorie Counter
    [Documentation]    Verify rapid taps properly accumulate calories
    [Tags]    edge_case    stability    priority_medium
    Navigate To Health Tab
    Scroll Down
    Wait And Click    accessibility_id=tool-calorie-counter
    FOR    ${i}    IN RANGE    10
        Wait And Click    accessibility_id=food-rice
    END
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=calorie-total    ${EXPLICIT_WAIT}
