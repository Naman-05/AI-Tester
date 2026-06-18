# Jira Test Case Suite: Restful Booker API

## Test Case TC-01: Auth Token Generation (Happy Path)
- Issue Type: Test
- Summary: Verify successful auth token generation for PUT and DELETE booking operations.
- Preconditions:
  - API base URL is reachable: https://restful-booker.herokuapp.com
  - Valid credentials are available: username `admin`, password `password123`
- Steps to Reproduce:
  1. Send POST request to `/auth`.
  2. Set header `Content-Type: application/json`.
  3. Use request body:
     ```json
     {
       "username": "admin",
       "password": "password123"
     }
     ```
- Expected Result:
  - HTTP status code `200 OK`.
  - Response body contains a non-empty `token` string.
  - Token can be used in the `Cookie` header as `token=<token_value>` or Basic auth header.
- Actual Result:
  - 

## Test Case TC-02: Health Check /ping (Happy Path)
- Issue Type: Test
- Summary: Verify the API health endpoint responds correctly.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send GET request to `/ping`.
- Expected Result:
  - HTTP status code `201 Created`.
  - Response body contains `OK`.
- Actual Result:
  - 

## Test Case TC-03: Create Booking (Happy Path)
- Issue Type: Test
- Summary: Create a new booking using JSON payload and verify response.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send POST request to `/booking`.
  2. Set header `Content-Type: application/json`.
  3. Use request body:
     ```json
     {
       "firstname": "Jim",
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
         "checkin": "2018-01-01",
         "checkout": "2019-01-01"
       },
       "additionalneeds": "Breakfast"
     }
     ```
- Expected Result:
  - HTTP status code `200 OK`.
  - Response body contains `bookingid` and nested `booking` object.
  - `booking` object values match the submitted request.
- Actual Result:
  - 

## Test Case TC-04: Get Booking by ID (Happy Path)
- Issue Type: Test
- Summary: Retrieve a created booking by its ID and verify returned data.
- Preconditions:
  - A valid booking exists with known `bookingid`.
- Steps to Reproduce:
  1. Send GET request to `/booking/{bookingid}`.
  2. Set header `Accept: application/json`.
- Expected Result:
  - HTTP status code `200 OK`.
  - Response body contains full booking details: `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates`, `additionalneeds`.
  - Returned values match the originally created booking.
- Actual Result:
  - 

## Test Case TC-05: Update Booking with PUT (Happy Path)
- Issue Type: Test
- Summary: Update an existing booking with full payload and verify response.
- Preconditions:
  - A valid booking exists with known `bookingid`.
  - Valid auth token is available.
- Steps to Reproduce:
  1. Send PUT request to `/booking/{bookingid}`.
  2. Set headers:
     - `Content-Type: application/json`
     - `Accept: application/json`
     - `Cookie: token=<token_value>` or `Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=`.
  3. Use request body:
     ```json
     {
       "firstname": "James",
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
         "checkin": "2018-01-01",
         "checkout": "2019-01-01"
       },
       "additionalneeds": "Breakfast"
     }
     ```
- Expected Result:
  - HTTP status code `200 OK`.
  - Response body contains updated booking details.
  - `firstname` is updated to `James`.
- Actual Result:
  - 

## Test Case TC-06: Partial Update Booking with PATCH (Happy Path)
- Issue Type: Test
- Summary: Update a subset of booking fields using PATCH and verify partial update behavior.
- Preconditions:
  - A valid booking exists with known `bookingid`.
  - Valid auth token is available.
- Steps to Reproduce:
  1. Send PATCH request to `/booking/{bookingid}`.
  2. Set headers:
     - `Content-Type: application/json`
     - `Accept: application/json`
     - `Cookie: token=<token_value>` or `Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=`.
  3. Use request body:
     ```json
     {
       "firstname": "James",
       "lastname": "Brown"
     }
     ```
- Expected Result:
  - HTTP status code `200 OK`.
  - Response body contains updated fields.
  - Any omitted fields remain unchanged.
- Actual Result:
  - 

## Test Case TC-07: Delete Booking (Happy Path)
- Issue Type: Test
- Summary: Delete an existing booking and verify the booking is removed.
- Preconditions:
  - A valid booking exists with known `bookingid`.
  - Valid auth token is available.
- Steps to Reproduce:
  1. Send DELETE request to `/booking/{bookingid}`.
  2. Set headers:
     - `Content-Type: application/json`
     - `Cookie: token=<token_value>` or `Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=`.
  3. Confirm deletion by sending GET request to `/booking/{bookingid}`.
- Expected Result:
  - DELETE returns `200 OK`.
  - Subsequent GET returns `404 Not Found`.
- Actual Result:
  - 

## Test Case TC-08: Create Booking with Missing Required Field (Error Scenario)
- Issue Type: Test
- Summary: Verify booking creation fails when required fields are missing.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send POST request to `/booking`.
  2. Set header `Content-Type: application/json`.
  3. Use request body missing `firstname`:
     ```json
     {
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
         "checkin": "2018-01-01",
         "checkout": "2019-01-01"
       },
       "additionalneeds": "Breakfast"
     }
     ```
- Expected Result:
  - HTTP status code `400 Bad Request` or similar validation error.
  - Response body identifies the missing `firstname` field.
- Actual Result:
  - 

## Test Case TC-09: Get Booking with Invalid ID (Error Scenario)
- Issue Type: Test
- Summary: Verify the API returns an error for a non-existent booking ID.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send GET request to `/booking/999999`.
  2. Set header `Accept: application/json`.
- Expected Result:
  - HTTP status code `404 Not Found`.
  - Response body indicates the booking was not found.
- Actual Result:
  - 

## Test Case TC-10: Update Booking Without Authentication (Error Scenario)
- Issue Type: Test
- Summary: Verify PUT requires authentication and rejects unauthorized requests.
- Preconditions:
  - A valid booking exists with known `bookingid`.
- Steps to Reproduce:
  1. Send PUT request to `/booking/{bookingid}` without `Cookie` or `Authorization` header.
  2. Set headers:
     - `Content-Type: application/json`
     - `Accept: application/json`
  3. Use a valid update payload.
- Expected Result:
  - HTTP status code `403 Forbidden` or `401 Unauthorized`.
  - Response body indicates authentication is required.
- Actual Result:
  - 

## Test Case TC-11: Delete Booking with Invalid Auth (Error Scenario)
- Issue Type: Test
- Summary: Verify DELETE rejects invalid authorization credentials.
- Preconditions:
  - A valid booking exists with known `bookingid`.
- Steps to Reproduce:
  1. Send DELETE request to `/booking/{bookingid}`.
  2. Set header `Authorization: Basic invalidtoken` and/or invalid `Cookie`.
- Expected Result:
  - HTTP status code `403 Forbidden` or `401 Unauthorized`.
  - Booking remains unchanged and still retrievable.
- Actual Result:
  - 

## Test Case TC-12: Create Booking with Invalid Date Format (Error Scenario)
- Issue Type: Test
- Summary: Verify booking creation rejects invalid date formats.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send POST request to `/booking`.
  2. Set header `Content-Type: application/json`.
  3. Use request body with invalid `checkin` format:
     ```json
     {
       "firstname": "Jim",
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
         "checkin": "01-01-2018",
         "checkout": "2019-01-01"
       },
       "additionalneeds": "Breakfast"
     }
     ```
- Expected Result:
  - HTTP status code `400 Bad Request`.
  - Response body reports invalid date format.
- Actual Result:
  - 

## Test Case TC-13: Get Bookings Filtered by Date Boundaries (Edge Case)
- Issue Type: Test
- Summary: Verify booking list filtering behaves correctly at boundary date values.
- Preconditions:
  - API base URL is reachable.
  - Booking records exist around the target date range.
- Steps to Reproduce:
  1. Send GET request to `/booking?checkin=2014-03-13&checkout=2014-10-23`.
  2. Set header `Accept: application/json`.
- Expected Result:
  - HTTP status code `200 OK`.
  - Returned booking IDs match bookings whose check-in and checkout dates fall within or equal to the filter boundaries.
- Actual Result:
  - 

## Test Case TC-14: Create Booking with Optional Fields Omitted (Edge Case)
- Issue Type: Test
- Summary: Verify booking creation succeeds when optional fields are omitted.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send POST request to `/booking`.
  2. Set header `Content-Type: application/json`.
  3. Use request body without `additionalneeds`:
     ```json
     {
       "firstname": "Sally",
       "lastname": "Brown",
       "totalprice": 111,
       "depositpaid": true,
       "bookingdates": {
         "checkin": "2013-02-23",
         "checkout": "2014-10-23"
       }
     }
     ```
- Expected Result:
  - HTTP status code `200 OK`.
  - Booking is created successfully and `booking.additionalneeds` is absent or null.
- Actual Result:
  - 

## Test Case TC-15: Unsupported HTTP Method on Booking Endpoint (Error Scenario)
- Issue Type: Test
- Summary: Verify unsupported methods are rejected by the API.
- Preconditions:
  - API base URL is reachable.
- Steps to Reproduce:
  1. Send DELETE request to `/booking` without an ID.
- Expected Result:
  - HTTP status code `405 Method Not Allowed` or `404 Not Found`.
  - Response body indicates the method is unsupported or resource not found.
- Actual Result:
  - 
