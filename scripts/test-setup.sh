#!/bin/bash

# テスト用環境変数を読み込み
if [ -f .env.test ]; then
    export $(cat .env.test | grep -v '^#' | grep -v '^$' | xargs)
fi

# Datastoreエミュレーターが起動するまで待機
echo "Waiting for Datastore emulator to be ready..."
timeout=60
while ! curl -s http://localhost:8082 > /dev/null 2>&1; do
    sleep 1
    timeout=$((timeout - 1))
    if [ $timeout -eq 0 ]; then
        echo "Error: Datastore emulator did not start within 60 seconds"
        exit 1
    fi
done

echo "Datastore emulator is ready!"

# テストを実行
exec "$@"