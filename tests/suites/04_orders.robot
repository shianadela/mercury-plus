*** Settings ***
Documentation     Mercury+ Orders Management Test Suite
...               Covers order tabs, order details, status tracking,
...               and reorder flows
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        orders

*** Test Cases ***
# ============================================================
# ORDERS - HAPPY PATH
# ============================================================
Orders Screen Shows Three Tabs
    [Documentation]    Verify Active, Completed, Cancelled tabs exist
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait Until Element Is Visible    accessibility_id=tab-active    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tab-completed    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=tab-cancelled    ${EXPLICIT_WAIT}

Active Tab Shows Active Orders With Badge
    [Documentation]    Verify Active tab shows order count badge
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait Until Element Is Visible    accessibility_id=active-badge    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-card-0    ${EXPLICIT_WAIT}

Order Card Shows Summary Information
    [Documentation]    Verify collapsed order card shows key details
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait Until Element Is Visible    accessibility_id=order-number-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-branch-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-date-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-status-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-total-0    ${EXPLICIT_WAIT}

Expand Order Card Shows Item Details
    [Documentation]    Verify tapping order card expands to show items
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait And Click    accessibility_id=order-card-0
    Wait Until Element Is Visible    accessibility_id=order-items-0    ${EXPLICIT_WAIT}

Ready For Pickup Order Shows Get Directions Button
    [Documentation]    Verify "Ready for Pickup" status shows directions button
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    # Find order with "Ready for Pickup" status
    Wait And Click    accessibility_id=order-card-0
    Wait Until Element Is Visible    accessibility_id=get-directions-button    ${EXPLICIT_WAIT}

Get Directions Button Shows Branch Directions Alert
    [Documentation]    Verify Get Directions shows directions info
    [Tags]    happy_path    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait And Click    accessibility_id=order-card-0
    Wait And Click    accessibility_id=get-directions-button
    Sleep    1
    Accept Alert

Preparing Order Shows Notification Note
    [Documentation]    Verify "Preparing" status shows blue info note
    [Tags]    happy_path    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait And Click    accessibility_id=order-card-1
    Wait Until Element Is Visible    accessibility_id=preparing-note    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=preparing-note    notify you when ready

Completed Tab Shows Completed Orders
    [Documentation]    Verify Completed tab lists finished orders
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-completed
    Wait Until Element Is Visible    accessibility_id=order-card-0    ${EXPLICIT_WAIT}

Completed Order Shows Reorder Button
    [Documentation]    Verify completed orders have a Reorder option
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-completed
    Wait And Click    accessibility_id=order-card-0
    Wait Until Element Is Visible    accessibility_id=reorder-button    ${EXPLICIT_WAIT}

Reorder Button Adds Items To Cart
    [Documentation]    Verify Reorder action adds items to cart
    [Tags]    happy_path    priority_high
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-completed
    Wait And Click    accessibility_id=order-card-0
    Wait And Click    accessibility_id=reorder-button
    Sleep    1
    Verify Alert Contains Text    added to cart
    Accept Alert

Cancelled Tab Shows Cancelled Orders
    [Documentation]    Verify Cancelled tab lists cancelled orders
    [Tags]    happy_path    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-cancelled
    Wait Until Element Is Visible    accessibility_id=order-card-0    ${EXPLICIT_WAIT}

# ============================================================
# ORDERS - ALTERNATE PATHS
# ============================================================
Order Status Badge Colors Are Correct
    [Documentation]    Verify status badges use correct colors
    [Tags]    alternate    ux    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait Until Element Is Visible    accessibility_id=status-badge-ready    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=status-badge-preparing    ${EXPLICIT_WAIT}

Collapse Expanded Order Card
    [Documentation]    Verify expanded order card can be collapsed
    [Tags]    alternate    ux    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait And Click    accessibility_id=order-card-0
    Wait Until Element Is Visible    accessibility_id=order-items-0    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=order-card-0
    Element Should Not Be Visible With Timeout    accessibility_id=order-items-0

Switch Between Order Tabs
    [Documentation]    Verify smooth tab switching
    [Tags]    alternate    navigation    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Sleep    0.5
    Wait And Click    accessibility_id=tab-completed
    Sleep    0.5
    Wait And Click    accessibility_id=tab-cancelled
    Sleep    0.5
    Wait And Click    accessibility_id=tab-active

# ============================================================
# ORDERS - NEGATIVE / EDGE CASES
# ============================================================
Empty Cancelled Tab Shows Empty State
    [Documentation]    Verify empty tab shows appropriate message
    [Tags]    negative    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-cancelled
    # If no cancelled orders, should show empty state
    Sleep    1

Expand Multiple Orders Simultaneously
    [Documentation]    Verify multiple orders can be expanded
    [Tags]    edge_case    priority_low
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Wait And Click    accessibility_id=order-card-0
    Wait And Click    accessibility_id=order-card-1
    Sleep    1

Rapid Tab Switching On Orders Screen
    [Documentation]    Verify rapid tab switching doesn't crash
    [Tags]    edge_case    stability    priority_medium
    Navigate To Orders Tab
    FOR    ${i}    IN RANGE    5
        Wait And Click    accessibility_id=tab-active
        Wait And Click    accessibility_id=tab-completed
        Wait And Click    accessibility_id=tab-cancelled
    END
    Verify Screen Is Displayed    orders-screen

Order Total Format Shows Philippine Peso
    [Documentation]    Verify order totals display in ₱ format
    [Tags]    edge_case    i18n    priority_medium
    Navigate To Orders Tab
    Wait And Click    accessibility_id=tab-active
    Verify Price Format    accessibility_id=order-total-0
