 
 
 
 
 
 
 
 
 
 
 
 
 
 
Business Requirement Document
    HaNova Academic Mentoring Platform
    
 Group 5
Tutorial Class 04
 
 
VERSION: 2
 
DATE <<01/04/2026>>
 
 

 
 
 
 
 
VERSION AND APPROVALS
UTORS
 
VERSION HISTORY	 
Version #	Date	Revised By (insert instructor name)	Reason for change
0	7/3/2026	Vũ Quỳnh Anh	Initial Definition of Project
1	12/3/2026	Vũ Quỳnh Anh	  UC Specification & Process Modelling
 2	1/4/2026	Vũ Quỳnh Anh	UC Specification & Process Modelling update and inclusion business case
             
 
Content changes between the current version and the previous version are identified using the Blackline convention (i.e., additions and deletions). 
This document has been approved as the official Business Requirements Document for HaNova Academic Mentoring Platform ,and accurately reflects the current understanding of business requirements. Following approval of this document, requirement changes will be governed by the project’s change management process, including impact analysis, appropriate reviews and approvals.
 
TEAM 	 
Member’s Name	Project Role	Signature Approval	Date
Nguyễn Thế Nam	Project Manager,UI/UX Designer,Business Analyst	Nam 	09/03/2026
Nguyễn Mạnh Hà 	System Designer,UI/UX Designer	Hà	09/03/2026
Tạ Thuỳ Linh	Business Analyst,System Analyst	Linh	09/03/2026
Phạm Thu Thảo	System Analyst, Data Analyst	Thảo	09/03/2026
Đặng Thị Tuyết Nhung	Requirement Analyst, Project Analyst	Nhung	09/03/2026
Lê Thị Thuỳ Trang	Data Analyst, UI/UX Analyst	Trang	09/03/2026
 
TABLE OF CONTENTS

Version and Approvals	2
Project Details	4
Overview	4
Document Resources	5
Glossary of Terms	5
Project Overview	5
4.1 Project Overview and Background	5
4.2 Project Dependencies	7
4.3 Stakeholders	7
(Optional) Key Assumptions and Constraints	7
5.1 Key Assumptions and Constraints	7
Business Requirements	8
Functional Requirements	8
Non-functional Requirements	9
Use Cases	10
Use Case Diagram	10
Use Case Specification	10
Appendices	11
Appendix A – Business Process Flows	11
Appendix B – Business Rules Catalog	12
Appendix C- Models	12
[Business case]	12


















PROJECT DETAILS
 
Project Name	 HaNova - Academic Mentoring Platform
Project Type	Web based Platform
Project Start Date	March 7, 2026
Project End Date	March 11, 2026
Project Sponsor	HaNova Tutoring Center 
Primary Driver	 Efficiency & Market Expansion
Secondary Driver	 Quality Improvement
Division	Education Technology
Project Manager	Nguyễn Thế Nam
 
OVERVIEW

This document defines the high level requirements for the HaNova - Academic Mentoring Platform. It will be used as the basis for the following activities:
 
·       Creating solution designs
·       Developing test plans, test scripts, and test cases
·       Determining project completion
·       Assessing project success
 
DOCUMENT RESOURCES
 
Name	Business Unit
(Individual, Company or Department….)	Role	Proposed Elicitation Techniques 
Ngô Thị Thanh Hương	Company	Secretary of HaNova Company	Interviews, direct meetings
             
             
             
             
 

GLOSSARY OF TERMS
 
Term/Acronym	Definition
    
Student	A user who searches for tutors and books mentoring lessons on the platform.
Tutor	A mentor who provides academic guidance and teaching sessions to students.
Booking	A scheduled mentoring lesson between a student and a tutor.
Study Schedule	A timetable that shows upcoming lessons and available study time slots for a student.
Tutor Availability	The time slots when a tutor is available to teach lessons.
Payment Transaction	The process of paying for a booked mentoring lesson through the platform.
Verified Review	Feedback submitted by a student who has completed a lesson with a tutor.
Notification	A system message informing users about bookings, schedule changes, or reminders.
Complaint	A report submitted by a student regarding issues with a tutor or lesson.
Study Plan	A structured learning plan that outlines study goals, lesson topics, and schedules.
 
PROJECT OVERVIEW
4.1 Project Overview and Background
HaNova is a private academic tutoring center in Hanoi that provides one-on-one and small-group mentoring for secondary and university students. The center manages a network of tutors and serves a growing number of students seeking academic support. Currently, HaNova operates using manual and fragmented processes: tutor-student matching is handled via messaging applications (e.g., Zalo), scheduling is managed through spreadsheets, payments are conducted through cash or informal transfers, and feedback is collected inconsistently. These practices result in inefficiencies and limited operational control.
The main problem addressed by this project is the lack of a centralized and automated system to manage tutoring operations, resulting in manual coordination, scheduling conflicts, inconsistent payments, and limited ability to monitor service quality and scale the business effectively.
The primary objectives of the HaNova platform project are:
1.	Centralized Tutor Management: To manage tutor profiles, availability, and student interactions within a unified system.
2.	Automated Booking and Scheduling: To provide real-time booking with live availability updates, reducing conflicts and manual coordination.
3.	Secure Payment Processing: To implement a transparent and trackable online payment system.
4.	Advanced Tutor Search: To enable efficient tutor discovery based on subject, availability, rating, and price.
5.	Verified Review System: To ensure service quality through structured and authenticated student feedback.
6.	Management Dashboard: To support administrators with insights into bookings, revenue, and tutor performance.
7.	User Account Management: To provide secure, role-based access for students, tutors, and administrators.
4.2 Project Dependencies
-	Payment Gateway Integration: The implementation of online payment functionality depends on successful integration with third-party providers (VNPay, Momo, or PayPal) and must be established before launching paid booking features
-	User Authentication System: Secure user registration and login functionality must be implemented before enabling personalized features such as student schedules, tutor dashboards, and booking management
-	Email and SMS Notification Service: The notification system relies on third-party services (such as Firebase, Twilio, or email providers) to deliver booking confirmations, reminders, and alerts to users
-	Calendar API Integration: Advanced scheduling features may depend on integration with Google Calendar or similar services for synchronization with users' personal calendars
-	Legal and Regulatory Compliance: The platform must adhere to data protection laws (such as Vietnam's Law on Cybersecurity) and payment security standards (PCI DSS) before launch to ensure user data protection and build trust
-	Marketing and User Acquisition: The success of the platform relies on continued promotion through social media channels (Facebook, Zalo, TikTok) and partnerships with educational institutions to drive user registration and engagement.
4.3 Stakeholders
The following comprises the internal and external stakeholders whose requirements are represented by this document:
 
    Stakeholders
1.	Ms. Ngô Thị Thanh Hương - Company Secretary
2. 	Project team
3. 	Student
4.	Tutor
5.	System Administrator 
 
(OPTIONAL) KEY ASSUMPTIONS AND CONSTRAINTS
5.1 Key Assumptions and Constraints
 
    Assumptions
1 	All users (students, tutors, managers) have reliable internet access and devices (computers, tablets, or smartphones) compatible with the web-based platform 
2	Tutors provide accurate and up-to-date information about their profiles, including qualifications, experience, subjects, pricing, and availability
3 	Students complete the booking process accurately and attend scheduled lessons as agreed
4 	Users complete identity verification processes as required to ensure security and trust within the platform
5 	The system is designed to handle varying levels of user traffic and data volume as the user base grows
6	Adequate security measures are implemented to protect user data and financial transactions
7	Third-party payment gateways and notification services remain operational and integrate smoothly with the platform
#	Constraints
1 	The system must support a minimum of 5000 concurrent users without performance degradation
2 	Booking process response time must not exceed 3 seconds from selection to confirmation
3 	Strict data protection regulations (Vietnam's Law on Cybersecurity) must be adhered to, affecting how user data is collected, stored, and processed
4 	Payment processing must comply with PCI DSS security standards to protect financial information
5 	The platform must be available 24/7 with uptime of at least 99.5% (downtime limited to approximately 3.6 hours per month)
6	The platform must be accessible on all major browsers (Chrome, Firefox, Safari, Edge) and devices with basic system requirements
7	The system must have in-code documentation to facilitate future maintenance and support data backup/restore functionalities
8	Budget constraints limit the use of expensive third-party services and enterprise-level hosting solutions
 
BUSINESS REQUIREMENTS
 
The following sections document the various business requirements of this project.
The requirements in this document are prioritized as follows: 

Value	Rating	Description
1	Critical	This requirement is critical to the success of the project. The project will not be possible without this requirement.
2	High	This requirement is high priority, but the project can be implemented at a bare minimum without this requirement.
3	Medium	This requirement is somewhat important, as it provides some value but the project can proceed without it.
4	Low	This is a low priority requirement, or a “nice to have” feature, if time and cost allow it.
5	Future	This requirement is out of scope for this project, and has been included here for a possible future release.

Functional Requirements
REQ#	PRIORITY	DESCRIPTION	RATIONALE	USE CASE
FR01	Critical	The system shall allow managers to approve tutor profiles before they become publicly visible to students.	Ensures that only verified tutors appear on the platform.	UC-01 Approve Tutor Profile for Public Listing
FR02	High
    The system shall allow tutors to create, update, and manage their teaching schedules and available time slots.	Tutors must manage their availability so students can book lessons.	UC-02 Managing Tutor's Study Schedule
FR03	High	The system shall allow tutors to view, accept, or reject incoming booking requests from students.	Tutors must confirm booking requests to finalize lesson scheduling.	UC-03 Manage Incoming Booking Requests
FR04 	High	The system shall allow tutors and students to reschedule or cancel previously booked lessons when necessary.	Flexibility is required to handle schedule changes or unexpected events.	UC-04 Reschedule or Cancel a Booked Lesson
FR05 	Critical	The system shall allow students to make payments for booked lessons and record the payment status of each transaction.	Payment confirmation ensures the booking is finalized and financial records are maintained.	UC-05 Process Lesson Payment
FR06	High 	The system shall send notifications to students and tutors when bookings are created, confirmed, rescheduled, or cancelled.	Notifications keep users informed about important booking updates. 	UC-06 Receive Booking and Class Notifications
FR07	High	Allow students to generate personalized study plans based on their goals and preferences.	Helps students structure learning and improve study efficiency.	UC-07 Generate Study Plan
FR08	High	The system shall allow users to create and manage study groups, including group details, member management, and group schedules.	Study groups enable collaborative learning among students.	UC-08 Manage Study Group
FR09	High	Allow students to create and manage study schedules by day, week, or month.	Helps students organize time and follow study plans effectively.	UC-09 Manage Personal Study Schedule
FR10	High	Allow students to submit reviews for tutors after completed lessons.	Ensures reliable feedback and improves tutor quality.	UC-10 Submit Verified Tutor Review
FR11	High	Allow managers to monitor tutor performance using ratings and feedback.	Supports quality control and tutor improvement.	UC-11 Review Tutor Performance
FR12	High	Allow students to submit complaints about tutors or lessons.	Ensures issue resolution and protects student experience.	UC-12 Submit Complaint About Tutor or Lesson
Non-functional Requirements
REQ#	PRIORITY	DESCRIPTION	RATIONALE	USE CASE
NFR01 	High	The system shall support at least 500 concurrent users without performance degradation. 	Ensures the platform can handle multiple students and tutors using the system simultaneously. 	All Use Cases 
NFR02	High	The system shall load main pages (dashboard, tutor listing, schedule) within 3 seconds under normal network conditions.	Fast response time improves user experience and prevents user frustration.	View Tutor Listing, Manage Schedule
NFR03	High	The system shall ensure secure authentication and protect user data using encrypted connections (HTTPS).	Protects sensitive information such as user accounts, schedules, and payment data.	Sign Up, Login, Process Lesson Payment
NFR04	Medium	The system shall maintain 99% system availability, excluding scheduled maintenance periods.	High availability ensures students and tutors can access the platform whenever needed.	All Use Cases
NFR05	Medium	The system interface shall be responsive and accessible on desktop, tablet, and mobile devices.	Allows users to access the platform from different devices conveniently.	All Use Cases

Use Case Diagram
 









Process Diagram
 














Use Case Specification
 

ID & Name:	UC-01 Approve Tutor Profile for Public Listing
Primary Actor:	Manager
Description:	The manager reviews a tutor's submitted profile and decides whether to approve it before the profile becomes publicly visible for students to search and view on the HaNova platform.
Trigger:	A tutor submits their profile and requests approval to be publicly listed.
Pre-conditions:	The tutor has created and submitted a profile.
The manager is logged into the HaNova system.
The tutor profile is in "Pending Approval" status.
Post-conditions:	The tutor profile status is updated to "Approved".
The profile becomes visible to students on the platform.
Students can search and view the tutor profile.
Normal Flow:	1.1 System displays a list of tutor profiles awaiting approval.
1.2 Manager selects a tutor profile to review.
1.3 System displays detailed tutor information (education, experience, subjects, etc.).
1.4 Manager reviews the tutor profile.
1.5 Manager clicks Approve.
1.6 System updates the tutor profile status to Approved.
1.7 System publishes the tutor profile so students can view and search it.
Alternative Flows:	2.1 Manager decides the tutor profile does not meet requirements and selects Reject.
 2.2 Manager provides a reason for rejection.
 2.3 System updates the tutor profile status to Rejected and notifies the tutor.
Exceptions:	Exception #1: System Update Failure
1.1 System fails to update the tutor profile status due to a database or server error.
 1.2 System displays an error message.
 1.3 Manager must retry the approval process later.
Priority:	High

 

ID & Name:	UC-02 Manage Tutor Schedule
Primary Actor:	Tutor
Description:	The tutor manages their teaching availability by creating, updating, or deleting available time slots (including date, time, title, and description) so that students can view and book lessons accordingly.
Trigger:	The tutor wants to update their availability schedule.
Pre-conditions:	The tutor has a registered and approved account.
The tutor is logged into the HaNova system.
Post-conditions:	The tutor’s schedule is updated in the system.
Students can view the available time slots.
Students can book lessons based on the available schedule.
Normal Flow:	1.1 System displays the tutor dashboard.
1.2 Tutor navigates to Schedule Management.
1.3 System displays the current tutor schedule.
1.4 Tutor selects Add Time Slot.
1.5 Tutor enters date, time, title, and description for the time slot.
1.6 Tutor confirms the schedule entry.
1.7 System saves the schedule information.
1.8 System updates and displays the new schedule.
Alternative Flows:	A1: Edit Existing Schedule
2.1 Tutor selects an existing time slot.
2.2 Tutor edits the date, time, title, or description.
2.3 System checks for time conflict.
2.4 If no conflict, system updates the schedule information.
2.5 System displays the updated schedule.
A2: Delete Schedule Slot
2.4 Tutor selects an existing time slot.
2.5 Tutor chooses Delete.
2.6 System removes the time slot from the schedule.
Exceptions:	Exception #1: Time Conflict
1.1 Tutor enters or edits a time slot that overlaps with an existing schedule.
1.2 System detects the conflict.
1.3 System displays a warning message indicating the time conflict.
1.4 Tutor must choose another time slot.
Priority:	High

 
ID & Name:	UC-03: Manage Incoming Booking Requests
Primary Actor:	Tutor
Description:	This use case allows a tutor to manage incoming booking requests submitted by students.
The tutor can view booking request details and decide whether to accept or reject the request.
If the request is accepted, the booking is confirmed and added to the tutor’s schedule.
If the request is rejected, the system updates the request status and notifies the student.
Trigger:	A tutor selects “Booking Requests” from the main navigation menu.
Pre-conditions:	The tutor must be logged into the system.
The student must have submitted a booking request.
The booking request must exist in the system.
Post-conditions:	The booking request status is updated to Accepted or Rejected.
The system updates the tutor’s schedule if the request is accepted.
The student receives a notification about the tutor’s decision.
Normal Flow:	1.1 The tutor navigates to the Booking Requests page.
1.2 The system displays the list of incoming booking requests.
1.3 The tutor selects a booking request to review.
1.4 The system displays the booking request details.
1.5 The tutor reviews the request information.
1.6 The tutor selects an action: Accept or Reject the booking request.
1.7 The tutor confirms the action.
1.8 The system validates the request and updates the booking status.
1.9 The system displays a confirmation message and notifies the student.
Alternative Flows:	2.1 Accept Booking Request
2.1.1 At step 1.6, the tutor selects Accept.
2.1.2 The system confirms the selected time slot is still available.
2.1.3 The system updates the booking status to Accepted.
2.1.4 The system adds the booking to the tutor’s schedule.
2.1.5 The system displays a confirmation message and notifies the student.
2.2 Reject Booking Request
2.2.1 At step 1.6, the tutor selects Reject.
2.2.2 The system asks the tutor to confirm the rejection.
2.2.3 The tutor confirms the rejection.
2.2.4 The system updates the booking status to Rejected.
2.2.5 The system notifies the student
Exceptions:	Exception #1: Booking request is no longer available
1.8 The system detects that the booking request is no longer valid (for example, the time slot has been removed or the request has been cancelled).
1.9 The system displays the message: “Error: Booking request is no longer available.”
Priority:	High



ID & Name:	UC-04: Reschedule / Cancel Lesson
Primary Actor:	 Student, Tutor
Description:	Student or Tutor can request to reschedule or cancel a previously booked lesson according to the system rules.
Trigger:	Student or Tutor selects the option to reschedule or cancel a booked lesson.
Pre-conditions:	A lesson has already been booked in the system and the user is logged in.
Post-conditions:	The lesson is either rescheduled to a new time or cancelled successfully and both parties are notified.
Normal Flow:	·  Student or Tutor logs into the system.
·  The user views the list of booked lessons.
·  The user selects a booked lesson.
·  The user chooses either Reschedule or Cancel.
·  If Reschedule is selected, the user selects a new time slot.
·  The system checks tutor availability.
·  If the time slot is available, the system updates the lesson schedule.
·  The system sends a notification to both Student and Tutor. 
Alternative Flows:	– Time Slot Not Available
1.  The system detects that the selected time slot is not available.
2.  The system asks the user to select another time slot.
A2 – Cancel Lesson
1.  The user selects the Cancel option.
2.  The system asks for confirmation.
3.  The user confirms the cancellation.
4.  The system cancels the lesson.
5.  The system sends a notification to the other participant.
Exceptions:	If a system error occurs during the rescheduling or cancellation process, the system displays an error message and the action is not completed. 
Priority:	High
Use Case Graphic (if any)



ID & Name:	UC-05: Process Lesson Payment
Primary Actor:	Student
Description:	The student pays for a booked lesson through the system.
Trigger:	The student selects the payment option for a booked lesson.
Pre-conditions:	The student has already booked a lesson and is logged into the system.
Post-conditions:	The payment is successfully recorded and the booking status is updated to “Paid”.
Normal Flow:	·  Student logs into the system.
·  Student views the list of booked lessons.
·  Student selects a lesson that requires payment.
·  Student chooses the Pay Lesson Fee option.
·  The system displays payment details.
·  Student selects a payment method.
·  Student confirms the payment.
·  The system processes the payment.
·  The system updates the booking status to Paid.
·  The system sends a payment confirmation notification. 
Alternative Flows:	A1 – Payment Cancelled
1. The student cancels the payment before confirming.
2. The system returns to the lesson details page.
Exceptions:	E1 – Payment Failed
1. The system detects that the payment transaction failed.
2. The system displays an error message.
3. The student can try the payment again.
Priority:	High
Use Case Graphic (if any)



Use Case ID & Name	UC-06 – Receive Booking and Class Notifications
Primary Actor	Student, Tutor
Description	This use case allows students and tutors to receive real-time notifications about booking activities such as booking confirmation, class reminders, schedule changes, or cancellations. Notifications help users stay updated and manage their learning or teaching schedule efficiently.
Trigger	A booking event occurs in the system (e.g., booking confirmation, schedule update, or cancellation).
Pre-conditions	
1. The user (Student or Tutor) has a registered account in the HaNova.
2. The user is logged in or has enabled notification settings.
3. A booking activity occurs in the system.

Post-conditions	 1. The user receives a notification related to the booking activity.
 2. The notification is stored in the user's notification history.
 3. The user is informed about the updated booking or class status.
Normal Flow	1.1. A student books a lesson with a tutor through the HaNova platform.
1.2. The system processes the booking request.
1.3. The booking is successfully recorded in the database.
1.4. The system generates a booking confirmation notification.
1.5. The system sends the notification to the tutor indicating that a new booking has been made.
1.6. The system sends a booking confirmation notification to the student.
1.7. The notification appears in the user's notification center.
1.8. The user receives a visual notification alert on the dashboard.
1.9. The system stores the notification in the user's notification history.
1.10. The user may click the notification to view booking details.
1.11. The system redirects the user to the booking detail page.
1.12. The user reviews the booking information.

Alternative Flows	AF1: Class Reminder Notification
1. The system detects that a scheduled class will begin soon.
2. The system automatically generates a reminder notification.
3. The system sends the reminder notification to both the student and the tutor.
4. The notification informs users about the upcoming class time.
 
AF2: Booking Cancellation Notification
1. A student or tutor cancels a scheduled lesson.
2. The system updates the booking status to Cancelled.
3. The system generates a cancellation notification.
4. The system sends the notification to the affected user.
AF3: Schedule Change Notification
1. A tutor modifies the lesson schedule.
2. The system updates the booking information.
3. The system generates a schedule update notification.
4. The notification is sent to the student informing them of the change.
 
Exceptions	Exception #1: Notification Service Failure
1. The system attempts to send a notification but the notification service fails.
2. The system records the failure in the system log.
3. The system retries sending the notification later.
 
Exception #2: User Notification Disabled
1. The user has disabled notifications in their settings.
2. The system stores the notification in the notification history but does not send a real-time alert.
Priority	High







ID & Name:	UC-07: Generate Study Plan
Primary Actor:	Tutor
Description:	The Tutor creates a study plan for a Student on HaNova. The system may generate a draft based on the subject and sessions. The Tutor reviews and finalizes the plan, which is then visible to the Student.
Trigger:	Tutor clicks "Create Study Plan" on the lesson management dashboard.
Pre-conditions:	1. Tutor is logged in with an approved, active account.
2. At least one confirmed booking exists between the Tutor and the target Student.
3. The subject for the plan has been agreed upon in the booking details.
Post-conditions:	1. A study plan is saved in the system and linked to the Tutor, the Student, and the related booking.
2. The Student receives a notification that a study plan has been shared with them.
3. The plan is visible on both the Tutor's and Student's dashboards.
4. If the plan is saved as a Draft, it is NOT visible to the Student until published.
Normal Flow:	1.1. Tutor logs in and selects "Student Management" or "Group Management".
1.2. Tutor selects a specific student or study group.
1.3. Tutor clicks "Create Study Plan" and the system displays the plan creation form with the following fields:
- Plan Name, Subject, Learning Objectives, Detailed Schedule (date, time, duration), Content of each session.(required)
 - Attached Materials, Homework Assignments, Assessment Method (optional).
1.4. Tutor enters information and can add/delete sessions flexibly.
1.5. Tutor clicks "Preview" to check the plan.
1.6. Tutor clicks "Submit".
1.7. System saves the plan to the database and sends a notification to the student/group members: "You have a new study plan from tutor.”
1.8. System displays a success message: "Study plan created successfully."
Alternative Flows:	AF1: Automatic Plan Generation System
 1.1. System analyzes the student's learning objectives and history, then generates a proposed plan.
1.2. System notifies the tutor that the proposed learning plan has been created.
1.3. Tutor clicks on the notification to open the proposed plan.
1.4. Tutor reviews, edits, and confirms the plan.
AF2: Tutor Edits an Existing Published Plan:
2.1. Tutor navigates to My Study Plans, selects an existing plan, and clicks Edit.
 2.2. System loads the current plan data and the tutor modifies the content, schedule, or notes.
 2.3. System saves the updated plan and sends a change notification to the student.
Exceptions:	Exception #1: Schedule conflict detected:
1.1. System detects that one or more proposed session slots overlap with the Tutor's existing confirmed bookings.
1.2. The system displays: "Error: Class schedules overlap. Please choose another time frame."
1.3. Tutor adjusts the conflicting slots and resubmits.
Exception #2: Required fields missing:
2.1.  System detects blank required fields (e.g., plan title, no sessions defined).
2.2. System highlights the missing fields and displays: "Please complete all required fields before saving."
2.3. Tutor corrects the fields and resubmits.
Priority:	High
Use Case Graphic (if any)



ID & Name:	UC-08: Manage Study Group
Primary Actor:	Student
Description:	This use case allows a student to manage their own study groups in My Study Groups.
The student can create a study group, view group details, update group information, leave a study group, or delete a study group.
Students who are members of a study group can also view the list of members and their contact information to communicate outside the platform.
All members in a study group have equal participation rights.
Trigger:	A student selects “Study Groups” from the main navigation menu and accesses “My Study Groups.”
Pre-conditions:	The student must be logged into the system.
The student must be a member of the study group to update it in My Study Groups.
The study group must exist in the system for deleting.
The student must be a member of the study group to view detailed member contact information.
Post-conditions:	Study group information may be created, viewed, updated, left, or deleted successfully.
The system updates the study group data accordingly.
If the last member leaves a study group, the system automatically deletes the study group.
Normal Flow:	1.1 The student navigates to the My Study Groups page.
1.2 The system displays the list of study groups that the student belongs to.
1.3 The student selects an action: Create, View, Update, Leave, or Delete Study Group.
1.4 The system displays the corresponding interface.
1.5 The student reviews, enters, or modifies the required information.
1.6 The student confirms the action.
1.7 The system validates the information and permissions.
1.8 The system processes the request and updates the study group data.
1.9 The system displays a confirmation message.
Alternative Flows:	2.1 View Study Group Details
2.1.1 At step 1.3, the student selects View Study Group.
2.1.2 The system displays the study group details and the list of members.
2.2 Leave Study Group
2.2.1 At step 1.3, the student selects Leave Study Group.
2.2.2 The system asks the student to confirm the action.
2.2.3 The student confirms leaving the study group.
2.2.4 The system removes the student from the study group.
2.2.5 If the student is the last member, the system automatically deletes the study group.
2.2.6 The system displays a confirmation message.
2.3 Delete Study Group
2.3.1 At step 1.3, the student selects Delete Study Group.
2.3.2 The system asks the student to confirm the action.
2.3.3 The student confirms deletion of the study group.
2.3.4 The system deletes the study group.
2.3.5 The system displays a confirmation message
Exceptions:	Exception #1: Required information is missing
1.6 The student confirms the action.
1.7 The system displays “Error: Required information is missing.”
Priority:	High


ID & Name:	UC-09: Manage Personal Study Schedule
Primary Actor:	Student
Description:	Students manage their personal study schedule by viewing, adding, editing, or deleting self-study sessions alongside confirmed tutor bookings.
Trigger:	The student selects the “My Schedule” option from the dashboard.
Pre-conditions:	 - Student is logged into HaNova.
 - Student has at least one confirmed booking with a tutor.
Post-conditions:	 - The personal study schedule is successfully updated.
 - The updated schedule is saved in the system database.
Normal Flow:	 1. Student opens "My Schedule" from the main menu.
 2. System retrieves booking data and displays a calendar (default: current week), highlighting confirmed lessons and empty slots.
 3. Student toggles Day/Week/Month view as needed; calendar refreshes accordingly.
 4. Student clicks a booked lesson to view details (tutor, subject, time, status).
Alternative Flows:	A1: Add Self-Study Session:
  1. Student clicks an empty time slot → "Add Self-Study" popup appears.
  2. Student enters subject, duration, notes → clicks Save.
  3. System validates no conflict with booked lessons → saves and updates calendar.
A2: Edit / Delete Self-Study Session:
  1. Student clicks an existing self-study session.
  2. Student selects Edit (modify fields → Update) or Delete → calendar refreshes.
Exceptions:	Exception 1: Schedule Data Loading Failure
  1.1. System attempts to retrieve schedule data
  1.2 Database connection fails or timeout occurs
  1.3. System displays error message: "Unable to load your schedule. Please check your connection and try again."
  1.4. System provides "Retry" button for student
 Exception 2: Time Slot Conflict Detected
  2.1. Student attempts to add self-study session in a time slot
  2.2. System detects existing booked lesson at same time
  2.3. System displays error: "Cannot add self-study during a booked lesson time"
  2.4 Self-study session is not saved
Priority:	High
Use Case Graphic (if any)



ID & Name:	UC-10: Submit Tutor Review
Primary Actor:	Student
Description:	Students to submit ratings and feedback regarding the tutor's teaching quality and attitude after a lesson is successfully completed. Reviews are verified and reflected on the tutor's public profile.
Trigger:	Student clicks the "Write Review" button in the lesson history or from a system notification reminder.
Pre-conditions:	1. Student is logged in.
 2. Student has completed at least one booked lesson (status = "Completed")
 3. Lesson was completed within the last 30 days.
 4. Student has not already submitted a review for this specific lesson
Post-conditions:	- Review is stored in the database.
- Tutor's average rating is recalculated and profile is updated.
Normal Flow:	1. Student navigates to "My Completed Lessons" and clicks "Write Review".
 2. System displays review form (tutor name, subject, date pre-filled).
 3. Student selects star rating (1–5, required) and writes a comment (10–500 chars).
 4. Student optionally selects tags → clicks "Submit Review".
 5. System validates all required fields are completed, saves review, recalculates tutor rating, updates tutor profile.
 6. System shows success message: "Thank you! Your verified review has been submitted."
Alternative Flows:	A1 - Edit Review Before Submit: Student edits any field before clicking Submit (no restriction).
 A2 -  Submit Review from Email/Notification Link
 1. Student receives email/notification with "Review Your Lesson" link
 2. Student clicks link and is directed to login page (if not already logged in)
 3. Redirected to pre-filled review form
 4. Flow continues from step 3
 A3 - Update Existing Review (Within 24 Hours)
 1. Student navigates to "My Reviews" section
 2. Student clicks Edit on a recent review
 3. System allows modification of rating and comment
 4. Resubmits (no duplicate created).
 duplicate)
Exceptions:	Exception 1 – Review Period Expired (>30 days): "Write Review" button disabled; expiry message shown.
 Exception 2 - Comment Validation Failed
  1. Comment Too Short (<10 chars)
  2. System validates comment length
  3. System displays error
  4. Form remains populated with previously entered data
  5. Student must correct before re-submission
 Exception 3 -  Rating Not Selected
  1. Student attempts to submit review without selecting star rating
  2.  System validates required rating field
  3. System displays error: "Please select a star rating"
  4. Rating field is highlighted
 Exception 4- System Save Failure
  1. Student submits review
  2. Database connection error occurs during save
  3. Error message shown; review data temporarily cached; error logged.
Priority:	High
Use Case Graphic (if any)



ID & Name	UC-11 – Review Tutor Performance
Primary Actor	Manager

Description	
This use case allows the manager to review the performance of tutors by analyzing booking statistics, acceptance rate, cancellation rate, student ratings, and feedback. The Manager can use this information to monitor tutor quality and make administrative decisions such as warnings, rewards, or account review.

Trigger	Manager selects “Review Tutor Performance” from the management dashboard.
Pre-conditions	1. Manager is logged into the HaNova system with administrator privileges.
 2. Tutor accounts exist in the system database.
 3. Tutor activity data such as bookings, ratings, and feedback has been recorded.
Post-conditions	
1. Tutor performance data is displayed to the Manager.
 2. The Manager gains insights about tutor performance quality.
 3. The system logs that the performance review activity was performed.

Normal Flow	1.1. Manager logs into the HaNova system using an administrator account.
1.2. Manager accesses the Admin Dashboard.
1.3. Manager selects the Tutor Management section.
1.4. The system displays a list of tutors registered on the platform.
1.5. Manager selects a specific tutor to review.
1.6. The system retrieves the tutor’s activity data from the database.
1.7. The system calculates performance metrics including:
· Total number of bookings
· Number of completed classes
· Acceptance rate of booking requests
· Cancellation rate
· Average student rating
· Total number of student reviews
1.8. The system displays the tutor performance report on the screen.
1.9. The Manager reviews the information and analyzes the tutor’s performance.
1.10. The system also displays student feedback comments related to the tutor.
1.11. The Manager may view performance statistics in graphical format (charts or performance indicators).
1.12. Manager finishes reviewing the tutor performance report.
 
Alternative Flows	AF1: Filter Tutor Performance by Time Period
1. Manager selects a date filter such as Last Week, Last Month, or Custom Range.
2. The system retrieves performance data within the selected time period.
3. The system updates the tutor performance report accordingly.
4. Manager reviews the updated performance statistics.
 
AF2: Compare Multiple Tutors
1. Manager selects multiple tutors from the tutor list.
2. Manager chooses the Compare Performance option.
3. The system retrieves performance data for the selected tutors.
4. The system displays a comparison table including ratings, booking numbers, and cancellation rates.
 
Exceptions	Exception #1: Tutor Data Not Found
1. The system cannot retrieve tutor performance data from the database.
2. The system displays an error message:
“Unable to retrieve tutor performance data. Please try again later.”
3. Manager may refresh the page or try again later.
 
Exception #2: No Performance Data Available
1. The selected tutor has no completed bookings yet.
2. The system displays the message: “No performance data available for this tutor.”
3. Manager returns to the tutor list or selects another tutor.
Priority	High
 



ID & Name:	UC-12: Submit Complaint
Primary Actor:	Student
Description:	This use case allows a Student to submit a complaint about a Tutor or  issues related to teaching quality, attitude, schedule errors... The Admin/Manager receives and processes the complaint.
Trigger:	Student selects “Submit Complaint” from the lesson or tutor page.
Pre-conditions:	The student has logged into the HaNova system.
The student has completed at least one lesson with a tutor (for valid complaint).
The lesson related to the complaint must exist in the system.
Post-conditions:	The complaint is recorded in the system with the status "Pending".
A notification is sent to the Admin/Manager for review.
The student receives confirmation that the complaint has been successfully submitted.
Normal Flow:	1.1. Students access "Lesson History" or "Tutor Profile" and select "Submit Complaint".
1.2. The system displays a complaint form with the following fields:
- Complaint Type: Teaching Quality, Attitude, Schedule Error, Absence, Payment, Other.
 - Detailed Description (required).
 - Attachment (optional, max 5MB),Anonymous (optional).
1.3. Student writes a detailed description of the complaint.
1.4. Student optionally uploads supporting evidence (screenshots, chat logs, files).
1.5. Student clicks 'Submit Complaint'.
1.6. System validates the form (category selected, description not empty).
1.7. System logs the complaint with: Complaint ID, timestamp, Student ID, Tutor ID, Lesson ID, category, description, attachments.
1.8. The system sends a confirmation message to the student: "Your complaint has been submitted. We will review and respond as soon as possible."
1.9. The system sends a notification to the Admin/Manager about the new complaint.
Alternative Flows:	AF1: Submit Anonymous Complaint
2.1. Student selects the “Submit Anonymous” option on the complaint form.
2.2. System displays a message informing that the complaint will be anonymous and the student's identity will only be visible to the Administrator/Manager.
2.3. Student completes the complaint information and clicks “Submit Complaint.”
2.4. System saves the complaint as Anonymous and notifies the Administrator/Manager.
AF2: Manager Requests Additional Information:
3.1. After submission, Manager reviews the complaint and determines more details are needed.
3.2. Manager sends a request-for-information message to the Student via the system.
3.3. Student receives a notification and provides the additional information.
3.4. Manager resumes the investigation.
Exceptions:	Exception #1: Complaint period has expired
1.1. Student attempts to submit a complaint for a lesson older than 7 days.
1.2. System displays: "The complaint window for this lesson has expired (7-day limit). Please contact support if you believe this is an error."
1.3. The Submit Complaint button is disabled; no form is displayed.
Exception #2: File upload exceeds size limit
2.1. Student attempts to attach a file larger than 10 MB.
2.2. System displays: "File size exceeds the 10 MB limit. Please compress or select a smaller file."
2.3. Student selects a valid file and proceeds.
Priority:	High
Use Case Graphic	 

APPENDIXES
Appendix A – Business Process Flows
<For each chosen use case, describe the current existing process workflow using a Process Flowchart and a Swimlanes activity diagram.>  

UC-01 Approve Tutor Profile for Public Listing
 

 
 
UC-02 Manage Tutor Schedule
 
 
-

UC-03: Manage Incoming Booking Requests
 
  
Use Case 04: Reschedule / Cancel Lesson


 



 

 

Use Case 05: Process Lesson Payment
 
 
Use Case 06: Receive Notifications
 
 
 


Use Case - 07: Generate Study Plan
 

 

 UC-08: Manage Study Group
 

 

Use Case 09: Manage Personal Study Schedule
                                 
 












Use Case 10: Submit Tutor Review

                                      

           

Use Case 11: Review Tutor Performance






 
 
 
Use Case - 12: Submit Complaint
                 
 
Appendix B 

 [Business case]





Name:	HaNova Academic Mentoring Platform	Date:     	 April, 2026

1.	– EXECUTIVE SUMMARY
The HaNova Academic Mentoring Platform project aims to replace manual and fragmented tutoring operations with an integrated, web-based solution to connect students with qualified tutors, manage bookings, process payments, and track service quality. The system will streamline administrative tasks, reduce scheduling errors, and improve transparency while enabling HaNova Tutoring Center to scale its reach and focus on delivering quality education. Key benefits include centralized tutor and booking management, secure online payments, real-time notifications, and a verified review system. The recommended solution involves developing a custom web platform with a phased implementation approach, leveraging cloud hosting and third-party integrations for scalability.

2.	– PROBLEM STATEMENT
Current operations at HaNova Tutoring Center rely on manual coordination and fragmented communication channels (Zalo, Facebook, phone), leading to:
Inefficiencies: Time-consuming manual booking and scheduling coordination
Students and tutors currently coordinate sessions through social media and phone calls, leading to duplicated effort, miscommunication, and wasted administrative time. Staff must manually track availability, confirm bookings, and update schedules, reducing overall capacity to serve more students.
Errors: Inaccurate payment handling and missed bookings
Without an integrated payment system, transactions are handled informally via cash or bank transfer with no automated records. This results in payment disputes, unconfirmed bookings, and difficulty producing accurate financial reports for center management.
Quality Gaps: No verified review system or tutor performance tracking
Students have no reliable way to assess tutor quality before booking, and management lacks visibility into tutor performance or complaint patterns. This exposes HaNova to reputational risk and makes it difficult to enforce service standards.
Poor Visibility: No real-time insights into platform activity
Management currently has no dashboard or reporting tools to monitor booking volumes, revenue trends, or student engagement. Strategic decisions are made with incomplete information, slowing the center's ability to respond to issues or opportunities.

3.	– ANALYSIS
What: The HaNova platform will automate core tutoring operations (tutor profile management, scheduling, booking, payment, reviews) and integrate with third-party services (VNPay/Momo, Firebase, Twilio).
Why:Manual processes cannot scale with market demand; an estimated 60% of administrative time is spent on coordination tasks that a platform would automate.
Impact of Inaction: Continued booking errors and payment disputes (~$18,000/year in losses), inability to grow beyond current capacity, and progressive loss of market share to digitally-native competitors.
Resources Needed:
Budget: $80,000 (development, cloud infrastructure, third-party integrations, training).
Timeline: 3 months (MVP), 6 months (full rollout).
Team: 6 internal members (PM, System Designer, Business Analyst, System Analyst, Requirement Analyst, Data Analyst) + external vendors for development and API integrations.


4.	– SOLUTION OPTIONS
Option	Pros	Cons
1. Custom HRMS	Tailored to HaNova's workflows; scalable; full control over features and data	Higher upfront cost, longer development time
2. Off-the-Shelf SaaS	Faster deployment; lower initial cost; vendor support included	Limited customization; recurring fees; may not fit Vietnam-specific needs
3. Do Nothing	No immediate cost or disruption	Operational inefficiencies persist; market share lost to competitors

5.	– COST-BENEFIT ANALYSIS

Option	Cost	Benefits	ROI Timeline
Custom HRMS	$80,000	~$35,000/year savings (reduced errors, admin efficiency, revenue growth)	~2.5 years
SaaS Solution	$15K/year	$12K/year savings; limited growth potential	~1.5 years
Do Nothing	$0	Continued ~$18,000/year losses (errors, disputes, churn)	N/A
Key Benefits:
Payroll Accuracy: Eliminates ~90% of manual booking errors through automated confirmation workflows.
Time Savings: Cuts administrative workload by an estimated 50%.
Payment Transparency: Integrated payment processing with full audit trails eliminates disputes and simplifies reconciliation.
Quality Assurance: Verified reviews and performance dashboards enable data-driven quality management.

6.	– RECOMMENDATION
Recommended Solution custom web platform for HaNova with phased implementation:
Phase 1 (3 months): MVP with tutor profile approval, schedule management, and booking management (accept, reject, reschedule, cancel).
Phase 2 (6 months): Online payment integration, notifications, verified reviews, study planning, and management reporting dashboards.
Methodology: Agile development with bi-weekly sprints.
Justification:
Long-term cost savings and revenue growth potential outweigh the higher upfront investment.
Only a custom solution can accommodate HaNova's specific workflows and Vietnam-market payment integrations (VNPay, Momo).
Alignment with HaNova's strategic goal of digital transformation and market expansion.
Next Steps: Secure stakeholder approval from Ms. Ngô Thị Thanh Hương, allocate budget, initiate vendor contracts for cloud hosting and API integrations (VNPay, Firebase, Twilio).
 
Appendix C- Models
  
Figure 1: Entity Relationship Diagram

 
Figure 2: Class Diagram









Sequences diagram
UC-01 – Approve Tutor Profile
 

 









UC-02 – Manage Tutor Schedule
  








UC-03 – Manage Incoming Booking Requests-
 











UC-04 – Reschedule / Cancel Lesson
 





UC5: Process Lesson Payment
 









UC6: Receive Booking & Class Notifications
 




















UC-07 – Generate Study Plan

 
UC-08 – Manage Study Group
 


UC-09 – Manage Personal Study Schedule
 

UC-10 – Submit Tutor Review
 






UC-11 – Review Tutor Performance

 










UC-12 – Submit Complaint
 
