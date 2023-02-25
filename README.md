# Home Library Service

## Info

- Dev environment: `Windows 10 Enterprise LTSC 2019`, `Node.js: LTS v18.12.1`

## Docker Info:

Информация:
  - использовался Docker `version 20.10.22, build 3a2c30b`
  - запускался на Hyper-V
  - настроен пользовательский мост для общения между контейнерами
  - включен авто-перезапуск контейнера после падения приложения
  - volumes:
    - файлы базы данных хранятся по пути `/var/lib/postgresql/data`
    - логи бд хранятся по пути `/var/lib/postgresql/data/pg_log`
    - хранятся сгенерированные миграции

Запуск приложения в Docker:
  - сценарий авто запуска: запускается контейнер с базой данныx, при первом запуcке генерируется миграция на основе сущностей, поднимается миграция в бд, после запускается nest сервер.
  - в prod режиме : `npm run docker`
  - в dev live-reload режиме: `npm run docker:dev`

Запуск сканирования на уязвимости:
  - для запуска vulnerabilities scanning: `npm run scan`
    - перед запуском нужно быть авторизированным `For additional monthly scans, sign into or sign up for Snyk for free with the following command: docker scan --login`
    - если имя образа отличается от того что задан в скрипте то укажите в ручную `docker scan [OPTIONS] IMAGE`
    - может выдать ошибку уязвимости в используемом мной образе, если его не пофиксили [18.14-alpine3.17 Vulnerability](https://dso.docker.com/images/node/digests/sha256:f8f6e351b184217e007918f27f821cb005a12826452cd6d7399920231a47ffac)

DockerHub:
  - Скачать build образы с DockerHub:
    ```
    docker pull sokolw/nodejs2022q4:home-library-postgres
    ```
    ```
    docker pull sokolw/nodejs2022q4:home-library-api
    ```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

- After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
- For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Additional info about routes

- If a non-existent identifier is specified when creating a `track` or `album`, 
then the field in the created object will be nulled.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging