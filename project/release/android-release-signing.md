# Android リリース署名設定

このプロジェクトは、`android/key.properties` があれば自動でリリース署名を使うように設定済みです。

## 1. keystore を作る

プロジェクト直下で次を実行します。

```bash
keytool -genkeypair -v \
  -keystore upload-keystore.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias upload
```

作成後、プロジェクト直下に `upload-keystore.jks` ができます。

## 2. key.properties を作る

`android/key.properties.example` を参考にして、`android/key.properties` を作ります。

```properties
storePassword=ここにkeystoreのパスワード
keyPassword=ここにkeyのパスワード
keyAlias=upload
storeFile=../upload-keystore.jks
```

## 3. ビルド確認

```bash
flutter build appbundle
```

または

```bash
flutter build apk --release
```

## 4. 注意

- `android/key.properties` は Git に含めません
- `upload-keystore.jks` も Git に含めません
- パスワードと keystore は必ず安全な場所にもバックアップしてください

## 今の設定ファイル

- [android/app/build.gradle.kts](../../../android/app/build.gradle.kts)
- [android/key.properties.example](../../../android/key.properties.example)
