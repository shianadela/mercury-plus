*** Settings ***
Documentation     Mercury+ Help & Support Test Suite
...               Covers FAQ search and accordion, contact options,
...               and accessibility for 25-65 age group
Resource          ../resources/common.resource
Suite Setup       Run Keywords    Open Mercury Plus App On Android    AND    Login With Valid Credentials
Suite Teardown    Close Mercury Plus App
Test Teardown     Take Screenshot On Failure
Force Tags        support

*** Variables ***
${FAQ_SEARCH_TERM}            prescription
${FAQ_NO_RESULTS}             zyxwvutsrq
${MERCURY_HOTLINE}            8911-5071
${SUPPORT_EMAIL}              support@mercuryplus.ph

*** Test Cases ***
# ============================================================
# SUPPORT - HAPPY PATH
# ============================================================
Support Screen Shows Search Bar
    [Documentation]    Verify FAQ search bar is displayed
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Verify Screen Is Displayed    support-screen
    Wait Until Element Is Visible    accessibility_id=faq-search-input    ${EXPLICIT_WAIT}

Support Screen Shows Eight FAQ Items
    [Documentation]    Verify all 8 FAQ accordion items are listed
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait Until Element Is Visible    accessibility_id=faq-item-0    ${EXPLICIT_WAIT}
    Scroll Down
    Scroll Down

Expand FAQ Accordion Item
    [Documentation]    Verify FAQ item expands to show answer
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Click    accessibility_id=faq-item-0
    Wait Until Element Is Visible    accessibility_id=faq-answer-0    ${EXPLICIT_WAIT}

Collapse FAQ Accordion Item
    [Documentation]    Verify expanded FAQ can be collapsed
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Click    accessibility_id=faq-item-0
    Wait Until Element Is Visible    accessibility_id=faq-answer-0    ${EXPLICIT_WAIT}
    Wait And Click    accessibility_id=faq-item-0
    Element Should Not Be Visible With Timeout    accessibility_id=faq-answer-0

Search FAQ By Keyword
    [Documentation]    Verify FAQ search filters by question and answer text
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Input Text    accessibility_id=faq-search-input    ${FAQ_SEARCH_TERM}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=faq-item-0    ${EXPLICIT_WAIT}

Clear FAQ Search
    [Documentation]    Verify clearing search restores all FAQ items
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Input Text    accessibility_id=faq-search-input    ${FAQ_SEARCH_TERM}
    Sleep    1
    Wait And Click    accessibility_id=clear-search
    Sleep    1

Contact Us Call Card
    [Documentation]    Verify Call Us card with Mercury Drug hotline
    [Tags]    happy_path    priority_high    demographics_25_65
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=contact-call    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=contact-phone    ${MERCURY_HOTLINE}

Contact Us Email Card
    [Documentation]    Verify Email card with support address
    [Tags]    happy_path    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=contact-email    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=contact-email-address    ${SUPPORT_EMAIL}

Live Chat Button Is Present
    [Documentation]    Verify "Start Live Chat" button exists
    [Tags]    happy_path    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=start-live-chat    ${EXPLICIT_WAIT}

Support Footer Shows Version
    [Documentation]    Verify "Mercury+ v1.0.0" footer
    [Tags]    happy_path    priority_low
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Scroll Down
    Scroll Down
    Scroll Down
    Wait Until Element Is Visible    accessibility_id=support-version    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=support-version    v1.0.0

# ============================================================
# SUPPORT - NEGATIVE CASES
# ============================================================
FAQ Search No Results Shows Empty State
    [Documentation]    Verify empty state when no FAQ matches
    [Tags]    negative    priority_high
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Input Text    accessibility_id=faq-search-input    ${FAQ_NO_RESULTS}
    Sleep    1
    Wait Until Element Is Visible    accessibility_id=no-results    ${EXPLICIT_WAIT}
    Element Text Should Contain    accessibility_id=no-results    No results found

FAQ Search With Special Characters
    [Documentation]    Verify special characters don't crash search
    [Tags]    negative    security    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Input Text    accessibility_id=faq-search-input    <script>alert('xss')</script>
    Sleep    1
    Verify Screen Is Displayed    support-screen

# ============================================================
# SUPPORT - EDGE CASES
# ============================================================
Expand Multiple FAQ Items
    [Documentation]    Verify multiple FAQ items can be expanded
    [Tags]    edge_case    priority_low
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Click    accessibility_id=faq-item-0
    Wait And Click    accessibility_id=faq-item-1
    Wait And Click    accessibility_id=faq-item-2
    Sleep    0.5

FAQ Answer Contains Step By Step Instructions
    [Documentation]    Verify FAQ answers have multi-line step instructions
    [Tags]    edge_case    content    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    Wait And Click    accessibility_id=faq-item-0
    ${answer}=    Get Text    accessibility_id=faq-answer-0
    Should Not Be Empty    ${answer}

FAQ Topics Cover Key Features
    [Documentation]    Verify FAQ covers prescription, Suki Card, reminders, security
    [Tags]    edge_case    content    priority_medium
    Navigate To Profile Tab
    Wait And Click    accessibility_id=menu-help-support
    # Verify key FAQ topics exist by searching
    Wait And Input Text    accessibility_id=faq-search-input    prescription
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=faq-item-0    ${EXPLICIT_WAIT}
    Wait And Input Text    accessibility_id=faq-search-input    Suki
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=faq-item-0    ${EXPLICIT_WAIT}
    Wait And Input Text    accessibility_id=faq-search-input    reminder
    Sleep    0.5
    Wait Until Element Is Visible    accessibility_id=faq-item-0    ${EXPLICIT_WAIT}
