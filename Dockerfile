FROM python:3.8-alpine

RUN apk update \
    && apk add gcc python3-dev musl-dev
RUN pip install --upgrade pip

WORKDIR /app
COPY ./requirements_prod.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
RUN chmod +x ./entrypoint.prod