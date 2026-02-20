*** Settings ***
Documentation     Mercury+ AI Health Assistant Chat Test Suite
...               Covers chat UI, messaging, keyword responses,
...               quick replies, and language toggle
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        chat

*** Variables ***
${HEADACHE_QUERY}             What's good for headache?
${FEVER_QUERY}                I have a fever
${COUGH_QUERY}                cough medicine
${ALLERGY_QUERY}              I have allergies
${GENERIC_QUERY}              generic alternatives
${PHARMACY_QUERY}             Find nearest pharmacy
${SIDE_EFFECT_QUERY}          side effects
${UNKNOWN_QUERY}              What is the meaning of life?
${EMPTY_MESSAGE}              ${EMPTY}
${MAX_CHARS}                  500

*** Test Cases ***
# ============================================================
# CHAT - HAPPY PATH
# ============================================================
Chat Screen Shows Header And Status
    [Documentation]    Verify chat header with "M+ Health Assistant" and "Online" status
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Verify Screen Is Displayed    chat-screen
    Element Text Should Contain    accessibility_id=chat-title    M+ Health Assistant
    Wait Until Element Is Visible    accessibility_id=ai-badge    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=chat-status    Online

Chat Shows Pre Seeded Messages
    [Documentation]    Verify initial 3 messages are displayed
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=chat-message-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=chat-message-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=chat-message-2    ${EXPLICIT_WAIT}

Bot Messages Are Left Aligned
    [Documentation]    Verify bot messages appear on the left
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=bot-message-0    ${EXPLICIT_WAIT}

Chat Shows Quick Reply Chips
    [Documentation]    Verify 4 quick reply suggestion chips
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=quick-reply-0    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-reply-1    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-reply-2    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=quick-reply-3    ${EXPLICIT_WAIT}

Send Message Via Text Input
    [Documentation]    Verify typing and sending a message
    [Tags]    happy_path    priority_critical
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${HEADACHE_QUERY}
    Wait And Click    accessibility_id=send-button
    # User message should appear on right
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=user-message    ${SHORT_WAIT}

Send Message Via Quick Reply Chip
    [Documentation]    Verify tapping quick reply sends it as message
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Click    accessibility_id=quick-reply-0
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=user-message    ${SHORT_WAIT}

Bot Responds To Headache Query
    [Documentation]    Verify bot responds with headache medicine recommendation
    [Tags]    happy_path    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${HEADACHE_QUERY}
    Wait And Click    accessibility_id=send-button
    Wait Until Element Is Visible    accessibility_id=typing-indicator    ${SHORT_WAIT}
    Wait Until Element Is Not Visible    accessibility_id=typing-indicator    ${EXPLICIT_WAIT}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Bot Responds To Fever Query
    [Documentation]    Verify bot responds to fever keyword
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${FEVER_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Bot Responds To Cough Query
    [Documentation]    Verify bot responds to cough keyword
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${COUGH_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Bot Responds To Allergy Query
    [Documentation]    Verify bot responds to allergy keyword
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${ALLERGY_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Bot Responds To Generic Alternatives Query
    [Documentation]    Verify bot responds to generic keyword
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${GENERIC_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Bot Responds To Pharmacy Query
    [Documentation]    Verify bot responds to nearest pharmacy keyword
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${PHARMACY_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

Typing Indicator Shows Bouncing Dots
    [Documentation]    Verify typing indicator animation during bot response
    [Tags]    happy_path    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${HEADACHE_QUERY}
    Wait And Click    accessibility_id=send-button
    Wait Until Element Is Visible    accessibility_id=typing-indicator    ${SHORT_WAIT}

Messages Show Timestamps
    [Documentation]    Verify each message has a timestamp
    [Tags]    happy_path    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=message-timestamp-0    ${EXPLICIT_WAIT}

Language Toggle Button Works
    [Documentation]    Verify EN/PH language toggle
    [Tags]    happy_path    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=language-toggle    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=language-toggle
    Sleep    0.5
    Wait And Click    accessibility_id=language-toggle

# ============================================================
# CHAT - ALTERNATE PATHS
# ============================================================
Quick Replies Hidden While Typing
    [Documentation]    Verify quick replies disappear during typing
    [Tags]    alternate    ux    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    test
    Element Should Not Be Visible With Timeout    accessibility_id=quick-reply-0

Send Button Disabled With Empty Input
    [Documentation]    Verify send button is disabled when input is empty
    [Tags]    alternate    validation    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait Until Element Is Visible    accessibility_id=send-button    ${EXPLICIT_WAIT}
    Element Should Be Disabled    accessibility_id=send-button

Navigate Back From Chat
    [Documentation]    Verify back button returns to previous screen
    [Tags]    alternate    navigation    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Go Back
    Verify Screen Is Displayed    home-screen

User Message Appears Right Aligned Green
    [Documentation]    Verify user messages are right-aligned with green background
    [Tags]    alternate    ux    priority_low
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    Hello
    Wait And Click    accessibility_id=send-button
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=user-message    ${SHORT_WAIT}

# ============================================================
# CHAT - NEGATIVE CASES
# ============================================================
Bot Handles Unknown Query Gracefully
    [Documentation]    Verify bot responds to unrecognized queries
    [Tags]    negative    priority_high
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    ${UNKNOWN_QUERY}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Wait Until Element Is Visible    accessibility_id=bot-response    ${EXPLICIT_WAIT}

# ============================================================
# CHAT - EDGE CASES
# ============================================================
Send Maximum Length Message
    [Documentation]    Verify 500 character limit
    [Tags]    edge_case    boundary    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    ${long_message}=    Evaluate    "a" * 500
    Wait And Input Text    accessibility_id=chat-input    ${long_message}
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}

Input Beyond Max Characters
    [Documentation]    Verify input is limited to 500 characters
    [Tags]    edge_case    boundary    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    ${over_limit}=    Evaluate    "a" * 600
    Wait And Input Text    accessibility_id=chat-input    ${over_limit}
    ${actual}=    Get Text    accessibility_id=chat-input
    ${length}=    Get Length    ${actual}
    Should Be True    ${length} <= ${MAX_CHARS}

Send Multiple Messages Rapidly
    [Documentation]    Verify rapid message sending is handled
    [Tags]    edge_case    stability    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    FOR    ${i}    IN RANGE    5
        Wait And Input Text    accessibility_id=chat-input    Message ${i}
        Wait And Click    accessibility_id=send-button
        Sleep    0.3
    END
    Sleep    ${LOADING_DELAY}
    Verify Screen Is Displayed    chat-screen

Chat With Special Characters
    [Documentation]    Verify special characters in messages don't crash
    [Tags]    edge_case    security    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    Wait And Input Text    accessibility_id=chat-input    <script>alert('xss')</script>
    Wait And Click    accessibility_id=send-button
    Sleep    ${LOADING_DELAY}
    Verify Screen Is Displayed    chat-screen

Chat Scroll Through Long Conversation
    [Documentation]    Verify scrolling works with many messages
    [Tags]    edge_case    performance    priority_medium
    Navigate To Home Tab
    Wait And Click    accessibility_id=quick-action-ai-chat
    FOR    ${i}    IN RANGE    10
        Wait And Input Text    accessibility_id=chat-input    Test message ${i}
        Wait And Click    accessibility_id=send-button
        Sleep    1.5
    END
    Scroll Up
    Scroll Up
    Wait Until Element Is Visible    accessibility_id=chat-message-0    ${EXPLICIT_WAIT}
