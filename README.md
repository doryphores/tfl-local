# TFL Local

Your local TFL departure boards for easy access in your home.

## Install and run for development

Install dependencies:

```
> npm install
```

[Register with National Rail API](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration) (Darwin) to get a token.

[Register with TFL](https://api-portal.tfl.gov.uk/signup) to get an app ID and key (only core datasets access is required).

Create a local `.env` file based on [the provided template](./.env.template).

Start the UI:

```
> npm start
```

Start the server:

```
> npm run server
```
