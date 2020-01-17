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

**Note**: The server prefixes all logs with message priorities compatible with `systemd`. e.g.:
```
<7>Web socket client connected
```
(the `7` means `debug`)

## Deploy the server to a raspberry pi

Raspberry pi pre-requisites:

- internet access
- `ssh` access (preferrably with authorized ssh key configured)
- `node` >= 10

**Note**: The deploy script assumes that the server will be installed to the default user's home folder:
```
/home/pi/tfl-local
```

To install as a systemd service:

```
> sudo cp pi/tfl-local.service /etc/systemd/system
> sudo systemd enable tfl-local
> sudo systemd start tfl-local
```

To check the server status:

```
> sudo systemd status tfl-local
```

To restart the server:

```
> sudo systemd restart tfl-local
```

To check the logs:

```
journalctl -u tfl-local
```

To tail the logs:

```
journalctl -u tfl-local -f
```
