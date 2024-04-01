# Utibu Health Mobile app

## Overview

This repository contains the code for the **Utibu Health Medical App**, a platform designed to facilitate medication ordering, payments, and management for patients. The app allows registered clients to remotely order medication, track orders, and manage their account statements.

Below is the architecture used to develop the app.

![Architecture](./utibu/images/Utibu%20Health%20System%20Architecture.png)

## Features

## 1. User registration and login

For clients to make order using the app, they have to be registered. Below is an image showing the registration process.

![Registration screen](./utibu/images/registration.jpg)

### User registration

In the registration page users need to submit the following credentials:

    - Username - A unique username for the clients
    - First name
    - Last name
    - Address - The address is used when the clients need their orders to be delivered to their location
    - Password 1 & Password.
    The password is set to accept a minimum of 4 characters. This improves the security of the user's account.

Successfully registered users are navigated to the login screen

#### Error handling in login

Passwords

Users can't create account with passwords with less than 4 characters. Below is a screenshot demonstration the password validation

- Users are unable to submit unmatched passwords as shown in the photo below
- Users cant create account with usernames already in user

These errors are demonstrated below:

![short password](./utibu/images/registration-errors.jpg)

### User login

To access the application, users need to login with their username and password in the login screen as shown below.

![login screen](./utibu/images/login.jpg)

If users submit the wrong credentials they are notified as demonstrated in the image below

![login errors](./utibu/images/no%20user.jpg)

## 2. Medicine dashboard

This dashboard shows the available medication.

![dosage dashboard](./utibu/images/dashboard.jpg)

The details include:

    - Dosage name
    - Dosage image
    - Price (KSH)
    - Option to add dosage to your cart
        <alert type="warning">Orders out of stock can't be added to cart.</alert>

The images below show the dashboard appearance with medicines added to cart

![Dosage added to cart](./utibu/images/dosage-view.jpg)

## 3. Medicine view screen

In this screen the users can be able to add medicines to cart (if in stock) or remove the medicine from cart. The screen also shows the:

    - Stock available
    - Price
    - If added to cart
    - Description

Below is an image showing medicine added to cart,

![Medicine added to cart](./utibu/images/added-to-cart.jpg)

Below is an image for medicines out of stock.

![Medicine out of stock](./utibu/images/out-of-stock-1.jpg)

If users try to add the medicine, they get an alert that they cant add the medicine.

![Alert for order out of stock](./utibu/images/out-of-stock.jpg)

## 4. Cart view screen

Users can view the medicines that they have added to their cart. This screen shows the list of the respective doses with:

    - Price
    - Ability to increment the count of dosage
    - Ability to decrement the count of dosage
    - Action to delete the dosage
    - Total amount to pay for all the dosage
    - Delivery method (whether to pick from pharmacy or have the medicine delivered  to their registered address)
    - Payment option (Pay on order or on delivery)

![Cart screen](./utibu/images/cart.jpg)

On checking out, the order is moved to the orders dashboard

## 5. Order's dashboard

In this screen users, are able to see the orders they made. The details include

    - Order status -(completed or in progress)
    - Amount to be paid or paid
    - Delivery method

Below is a screen showing these details

![Order dashboard](./utibu/images/orders.jpg)

## 6. Profile screen

In this section, users are able to view their personal information. This will contain the detailed recordded during registration. - Address - First name - Last name - username - (This is placed on the right header side of the appbar)

The screen also provides the users with ability to logout from the application

![profile section](./utibu/images/address.jpg)

## Below is the application logo

![logo](./images/logo.png)
