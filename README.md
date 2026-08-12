# NutriCampus Live

Create a working interactive website prototype for our college project:

NutriCampus

Smart Cafeteria Management System

This is a software prototype for a college project presentation. Do NOT create a presentation or slide deck. Create a modern, interactive web-app style prototype that we can demonstrate live to judges.

Core concept

NutriCampus connects: Students → Live cafeteria information → IoT data simulation → College Dashboard → Feedback → College action

The real project would use ESP32 and occupancy/queue sensors, but we do NOT have hardware available for this prototype.

Therefore, simulate the IoT sensor data entirely in software.

Clearly present the sensor data as simulated/demo data, while showing how the real system would work.

1. Overall design

Use a clean, modern, youthful college-tech aesthetic.

Use:

White/light background

Dark green as the primary color

Light green accents

Rounded cards

Clean icons

Minimal animations

Professional typography

Responsive layout

No excessive gradients

No unnecessary decorative elements

The website should look like an actual startup/product prototype rather than a generic AI-generated website.

Brand name: NutriCampus

Subtitle: Smart Cafeteria Management System

2. Navigation

Create a top navigation bar containing:

NutriCampus

Navigation options:

Student

College Dashboard

About System

The Student page should open by default.

3. STUDENT PAGE

Create a dashboard for a student checking the cafeteria before going there.

Main heading:

Eat smarter. Wait less.

Supporting text:

“Check crowd levels, waiting time and today's menu before heading to the cafeteria.”

Live Cafeteria Status card

Show:

HOSTEL MESS

🟢 LIVE

Crowd: 86 / 100

Waiting time: 15 min

Seats available: 4

Include a visual occupancy/progress bar.

Also show:

Current status: BUSY

Add a button:

Check Recommendation

When clicked, display something like:

“The cafeteria is currently busy. Consider waiting a few minutes or choosing an alternate food location.”

4. Simulated IoT interaction

This is extremely important.

Add a clearly visible button:

Simulate Crowd Change

When the button is clicked, randomly change the values.

Example states:

State 1:

Crowd: 42/100

Waiting time: 7 min

Seats: 18

Status: QUIET

State 2:

Crowd: 63/100

Waiting time: 10 min

Seats: 11

Status: MODERATE

State 3:

Crowd: 86/100

Waiting time: 15 min

Seats: 4

Status: BUSY

State 4:

Crowd: 94/100

Waiting time: 19 min

Seats: 2

Status: VERY BUSY

When the values change, update the entire student dashboard automatically.

Show a small label:

SIMULATED IoT DATA

Add a small explanation:

“Prototype simulation — in the final system, occupancy and queue sensors connected to an ESP32 would provide this data.”

5. Today's Menu

Create a card called:

Today's Menu

Include:

Rice & Dal
Nutrition: Carbohydrates • Protein
320 kcal

Vegetable Curry
Nutrition: Fiber • Vitamins
140 kcal

Curd
Nutrition: Protein • Calcium
90 kcal

Do not make this a calorie-tracking or dieting system. The nutrition information is only intended to demonstrate how menu information can be displayed.

6. Student Feedback

Add a:

Give Feedback

button.

When clicked, open a small modal.

Show:

“How was your cafeteria experience?”

Rating buttons:

1 2 3 4 5

Optional comment box.

Button:

Submit Feedback

After submission, show:

“Thank you! Your feedback has been added to the college dashboard.”

7. COLLEGE DASHBOARD

Create a separate interactive dashboard accessible through the navigation.

Heading:

Live Cafeteria Dashboard

Subtitle:

“Real-time cafeteria flow and feedback insights.”

Display four large metric cards:

Occupancy

86%

Waiting Time

15 min

Seats Available

4

Student Feedback

4.6 / 5

8. Crowd Analytics

Create a visually attractive chart titled:

Today's Crowd Pattern

Show approximate crowd levels:

11 AM — 28% 12 PM — 42% 1 PM — 88% 2 PM — 64% 3 PM — 36% 4 PM — 24%

Highlight that the peak period is:

12:45 PM – 1:15 PM

The chart should update when the “Simulate Crowd Change” button is used.

9. Feedback & College Insights

Create an insights card containing:

Peak crowd 12:45–1:15 PM

Common complaint Queue length

Popular menu Rice • Dal • Curry

Suggested action Improve counter flow

10. Feedback Loop

Create a visual process:

IoT Data ↓ NutriCampus Dashboard ↓ Student Feedback ↓ College Insight ↓ Operational Action

Show this example:

“Mess crowded at 1:00 PM → repeated crowd pattern detected → college adjusts service timing or counters.”

This should visually communicate that the system is not just an information app; it creates a feedback loop for improving cafeteria operations.

11. ABOUT SYSTEM

Create a simple section explaining the architecture.

Student Platform

View live crowd

View waiting time

View menu and nutrition information

Give feedback

IoT Layer

Occupancy sensing

Queue monitoring

ESP32 data collection

Wi-Fi transmission

College Dashboard

Crowd insights

Peak-hour analysis

Feedback

Operational decisions

Important:

Since this is a software-only prototype, do NOT pretend that actual sensors are connected.

Display:

Prototype Mode

“Sensor readings are simulated for demonstration. The proposed final implementation uses occupancy/queue sensors connected to an ESP32 and sends the readings to the NutriCampus platform through Wi-Fi.”

12. Demonstration flow

Make the website especially suitable for a live college presentation.

The presenter should be able to demonstrate:

Open Student page.

Show current cafeteria crowd.

Click Simulate Crowd Change.

Show crowd/waiting time/seats changing.

Click Check Recommendation.

Give student feedback.

Open College Dashboard.

Show updated cafeteria information and analytics.

Explain the feedback loop.

Open About System and explain how simulated data would eventually come from ESP32 + sensors.

IMPORTANT REQUIREMENTS

This must be an interactive website prototype, not slides.

Buttons must actually work.

Navigation must actually work.

Crowd simulation must actually change the displayed values.

Feedback submission must work.

Dashboard values should update consistently.

Use realistic demo data.

Make it look polished enough for a college project judging/demo.

Do not add login/signup.

Do not add payment functionality.

Do not add unnecessary pages.

Do not add fake hardware connectivity.

Do not claim that real-time sensor hardware is currently connected.

Keep the prototype simple enough to demonstrate in 2–3 minutes.

The final result should feel like a real NutriCampus product prototype, while making it clear that the IoT readings are simulated because this version is a software demonstration.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2367ce8b-c5c7-465c-9abb-8d9748711bc0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
