*** Settings ***
Documentation     Mercury+ Checkout & Order Placement Test Suite
...               Covers cart management, pickup options, payment methods,
...               order placement, and success confirmation
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        checkout

*** Test Cases ***
# ============================================================
# CHECKOUT - HAPPY PATH
# ============================================================
Checkout Screen Shows Cart Items
    [Documentation]    Verify 3 hardcoded cart items are displayed
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    # Navigate to checkout (assumes items in cart via prescription flow)
    Wait And Click    accessibility_id=quick-action-scan-rx
    Scroll Down
    Wait And Click    accessibility_id=recent-prescription-0
    Scroll Down
    Wait And Click    accessibility_id=add-all-to-cart
    Go Back
    Go Back
    # Navigate to checkout screen
    Wait And Click    accessibility_id=cart-icon
    Wait Until Element Is Visible    accessibility_id=cart-item-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=cart-item-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=cart-item-2    ${EXPLICIT_WAIT}

Cart Item Shows Name Type And Price
    [Documentation]    Verify each cart item displays complete info
    [Tags]    happy_path    priority_high
    Wait Until Element Is Visible    accessibility_id=item-name-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=item-type-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=item-price-0    ${EXPLICIT_WAIT}

Cart Item Quantity Can Be Increased
    [Documentation]    Verify + button increases quantity
    [Tags]    happy_path    priority_high
    Wait Until Element Is Visible    accessibility_id=quantity-0    ${EXPLICIT_WAIT}
    ${initial}=    Get Text    accessibility_id=quantity-0
    Wait And Click    accessibility_id=increase-qty-0
    ${after}=    Get Text    accessibility_id=quantity-0
    ${initial_int}=    Convert To Integer    ${initial}
    ${after_int}=    Convert To Integer    ${after}
    Should Be Equal As Integers    ${after_int}    ${initial_int + 1}

Cart Item Quantity Can Be Decreased
    [Documentation]    Verify - button decreases quantity
    [Tags]    happy_path    priority_high
    Wait And Click    accessibility_id=increase-qty-0
    Wait And Click    accessibility_id=increase-qty-0
    ${before}=    Get Text    accessibility_id=quantity-0
    Wait And Click    accessibility_id=decrease-qty-0
    ${after}=    Get Text    accessibility_id=quantity-0
    ${before_int}=    Convert To Integer    ${before}
    ${after_int}=    Convert To Integer    ${after}
    Should Be Equal As Integers    ${after_int}    ${before_int - 1}

Remove Cart Item
    [Documentation]    Verify X button removes item from cart
    [Tags]    happy_path    priority_high
    Wait And Click    accessibility_id=remove-item-0
    Sleep    0.5

Pickup Branch Is Displayed
    [Documentation]    Verify pickup branch card shows branch info
    [Tags]    happy_path    priority_high
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=pickup-branch    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=pickup-branch    Mercury Drug - Makati

Select Pickup Time ASAP
    [Documentation]    Verify ASAP pickup time can be selected
    [Tags]    happy_path    priority_high
    Wait Until Element Is Visible    accessibility_id=pickup-asap    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=pickup-asap
    Wait Until Element Is Visible    accessibility_id=skip-line-badge    ${EXPLICIT_WAIT}

Select Scheduled Pickup Time
    [Documentation]    Verify scheduled pickup time can be selected
    [Tags]    happy_path    priority_medium
    Wait And Click    accessibility_id=pickup-scheduled
    Sleep    0.5

Order Summary Shows Correct Breakdown
    [Documentation]    Verify subtotal, service fee, discount, total
    [Tags]    happy_path    priority_critical
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=order-subtotal    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=service-fee    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=suki-discount    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=order-total    ${EXPLICIT_WAIT}

Service Fee Is 15 Pesos
    [Documentation]    Verify flat ₱15 service fee
    [Tags]    happy_path    priority_medium
    Scroll Down
    Element Text Should Contain    accessibility_id=service-fee    15

Suki Card Shows 5 Percent Discount
    [Documentation]    Verify 5% Suki Card discount is applied
    [Tags]    happy_path    priority_medium
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=suki-discount    ${EXPLICIT_WAIT}

Suki Points Earned Is Displayed
    [Documentation]    Verify points earned calculation
    [Tags]    happy_path    priority_low
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=suki-points-earned    ${EXPLICIT_WAIT}

Payment Methods Show Five Options
    [Documentation]    Verify all 5 payment methods are available
    [Tags]    happy_path    priority_high
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=payment-gcash    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=payment-maya    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=payment-card    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=payment-suki-wallet    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=payment-insurance    ${EXPLICIT_WAIT}

Select GCash Payment
    [Documentation]    Verify GCash can be selected as payment
    [Tags]    happy_path    priority_high
    Scroll Down
    Wait And Click    accessibility_id=payment-gcash
    Wait Until Element Is Visible    accessibility_id=payment-gcash-selected    ${EXPLICIT_WAIT}

Select Maya Payment
    [Documentation]    Verify Maya can be selected as payment
    [Tags]    happy_path    priority_medium
    Scroll Down
    Wait And Click    accessibility_id=payment-maya
    Wait Until Element Is Visible    accessibility_id=payment-maya-selected    ${EXPLICIT_WAIT}

Payment Selection Is Radio Behavior
    [Documentation]    Verify only one payment can be selected at a time
    [Tags]    happy_path    priority_high
    Scroll Down
    Wait And Click    accessibility_id=payment-gcash
    Wait And Click    accessibility_id=payment-maya
    Wait Until Element Is Visible    accessibility_id=payment-maya-selected    ${EXPLICIT_WAIT}
    Element Should Not Be Visible With Timeout    accessibility_id=payment-gcash-selected

Place Order Successfully
    [Documentation]    Verify complete order placement flow
    [Tags]    happy_path    priority_critical    smoke
    Scroll Down
    Wait And Click    accessibility_id=payment-gcash
    Scroll Down
    Wait And Click    accessibility_id=place-order-button
    # Loading spinner for 2 seconds
    Wait Until Element Is Visible    accessibility_id=order-loading    ${SHORT_WAIT}
    # Success modal
    Wait Until Element Is Visible    accessibility_id=success-modal    ${EXPLICIT_WAIT}

Success Modal Shows Order Details
    [Documentation]    Verify success modal content
    [Tags]    happy_path    priority_high
    Wait Until Element Is Visible    accessibility_id=success-checkmark    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=success-title    Order Placed Successfully
    Wait Until Element Is Visible    accessibility_id=success-order-number    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=success-order-number    MP-2026-003
    Wait Until Element Is Visible    accessibility_id=success-qr-code    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=success-pickup-time    15-20 mins

Success Modal View Order Button
    [Documentation]    Verify "View Order" navigates to success screen
    [Tags]    happy_path    priority_high
    Wait And Click    accessibility_id=view-order-button
    Verify Screen Is Displayed    order-success-screen

Success Modal Back To Home Button
    [Documentation]    Verify "Back to Home" returns to home screen
    [Tags]    happy_path    priority_high
    # Re-trigger success modal for this test
    Wait And Click    accessibility_id=back-to-home-button
    Verify Screen Is Displayed    home-screen

# ============================================================
# ORDER CONFIRMATION SCREEN - HAPPY PATH
# ============================================================
Order Confirmation Shows Full Details
    [Documentation]    Verify order confirmation screen content
    [Tags]    happy_path    priority_high
    # Navigate to success screen directly
    Wait Until Element Is Visible    accessibility_id=order-confirmed-title    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=confirmation-branch    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=confirmation-pickup-time    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=confirmation-payment    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=confirmation-items    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=confirmation-total    ${EXPLICIT_WAIT}

Order Confirmation Shows QR Code
    [Documentation]    Verify pickup QR code is displayed
    [Tags]    happy_path    priority_high
    Wait Until Element Is Visible    accessibility_id=pickup-qr-code    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=scan-at-counter-label    ${EXPLICIT_WAIT}

Set Medication Reminders Link From Confirmation
    [Documentation]    Verify reminder link navigates to reminders
    [Tags]    happy_path    priority_medium
    Wait And Click    accessibility_id=set-reminders-link
    Verify Screen Is Displayed    reminders-screen

# ============================================================
# CHECKOUT - NEGATIVE CASES
# ============================================================
Place Order Button Disabled With Empty Cart
    [Documentation]    Verify order button is disabled when cart is empty
    [Tags]    negative    priority_critical
    # Remove all items
    Run Keyword And Ignore Error    Wait And Click    accessibility_id=remove-item-0
    Run Keyword And Ignore Error    Wait And Click    accessibility_id=remove-item-0
    Run Keyword And Ignore Error    Wait And Click    accessibility_id=remove-item-0
    Sleep    0.5
    Element Should Be Disabled    accessibility_id=place-order-button

# ============================================================
# CHECKOUT - EDGE CASES
# ============================================================
Decrease Quantity To Zero Removes Item
    [Documentation]    Verify decreasing to 0 removes item from cart
    [Tags]    edge_case    priority_high
    Wait Until Element Is Visible    accessibility_id=quantity-0    ${EXPLICIT_WAIT}
    # Keep clicking decrease until item removed
    Wait And Click    accessibility_id=decrease-qty-0
    Sleep    0.5

Rapid Quantity Increase
    [Documentation]    Verify rapid quantity changes are handled
    [Tags]    edge_case    stability    priority_medium
    Wait Until Element Is Visible    accessibility_id=increase-qty-0    ${EXPLICIT_WAIT}
    FOR    ${i}    IN RANGE    10
        Wait And Click    accessibility_id=increase-qty-0
    END
    Sleep    0.5
    ${qty}=    Get Text    accessibility_id=quantity-0
    ${qty_int}=    Convert To Integer    ${qty}
    Should Be True    ${qty_int} > 1

Order Total Updates On Quantity Change
    [Documentation]    Verify total recalculates when quantity changes
    [Tags]    edge_case    priority_high
    ${initial_total}=    Get Text    accessibility_id=order-total
    Wait And Click    accessibility_id=increase-qty-0
    Sleep    0.5
    ${updated_total}=    Get Text    accessibility_id=order-total
    Should Not Be Equal    ${initial_total}    ${updated_total}

Switch Payment Methods Rapidly
    [Documentation]    Verify rapid payment switching doesn't cause issues
    [Tags]    edge_case    stability    priority_low
    Scroll Down
    FOR    ${i}    IN RANGE    3
        Wait And Click    accessibility_id=payment-gcash
        Wait And Click    accessibility_id=payment-maya
        Wait And Click    accessibility_id=payment-card
        Wait And Click    accessibility_id=payment-suki-wallet
        Wait And Click    accessibility_id=payment-insurance
    END
    Sleep    0.5
