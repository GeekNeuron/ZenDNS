FROM python:3.11-slim

WORKDIR /app

COPY ./api.py ./store_logs.py ./notifier.py ./email_notifier.py ./realtime_ws.py ./load_env.py ./dns_logs.db ./
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080 9001

CMD ["python", "api.py"]
