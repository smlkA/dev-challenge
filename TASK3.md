## Here are the requirements

- Required fields for each event are: **event title, event date, event location** and **registration cost**.
- We have registered members (you can access member id, name, email etc.), and only members are allowed to register.
- Event registrations can be cancelled and/or transferred to different events.
- Members can pay fully or partially at the time of registration.

## Questions

1. As per the above provided requirements, define the minimal database structure which can satisfy the requirements. No queries are required, and what required tables and fields required?

2. Define what steps required for event registration (i.e. database flow). Suppose you are already logged in and on registration page with option to select event from dropdown list, member information is available globally.

3. Describe the database flow for cancellation and/or refund?

## Replies

1. Users table (id, email, etc)
   Payment methods table (id, userId, cardInfo)

   Events table (id, title, date, location, limit, price, etc)
   Registered users table (id, eventId, userId, userPaymentMethodId, status (active, cancelled), type (refundable or not))

   Refunds table (id, eventId, userId, userPaymentMethodId, amount)

2. User selects event from the list (event id is available)
   Send request and check availability of the event (e.g. limit of attendees)
   User selects payment method (existing one or create a new one) (userPaymentMethodId is available)
   Send request to BE and create a record in Registered users table

3. If event is cancelled
   Check table Registered users table and have a list of users and payment methods
   Do payment and create records in Refunds table
