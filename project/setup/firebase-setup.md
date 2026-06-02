# Firebase Setup

このプロジェクトでは、次を Firebase で使います。

- `Firebase Authentication`
- `Cloud Firestore`
- `Cloud Storage for Firebase`

## 1. Firebase プロジェクトを作成

1. Firebase Console を開く
2. 新しいプロジェクトを作成
3. `Authentication` を開く
4. `Sign-in method` で `Email/Password` を有効化する
5. `Sign-in method` で `Google` も有効化する
6. `Cloud Firestore` を開いてデータベースを作成する
7. `Cloud Storage` を開いてバケットを作成する

公式:
- https://firebase.google.com/docs/auth/flutter/start
- https://firebase.google.com/docs/auth/flutter/password-auth
- https://firebase.google.com/docs/firestore/quickstart
- https://firebase.google.com/docs/storage/flutter/start

補足:
- メール認証ページを完全日本語にしたいときは [Email Action Handler Setup](email-action-handler-setup.md) を参照

## 2. アプリIDを決める

このプロジェクトでは、ひとまず次のアプリIDに変更済みです。

- Android: `com.outasato.uchinoko_diary`
- iOS: `com.outasato.uchinokoDiary`

変更した箇所:
- `android/app/build.gradle.kts`
- `android/app/src/main/kotlin/com/example/uchinoko_diary/MainActivity.kt`
- `ios/Runner.xcodeproj/project.pbxproj`

公開を見据えるなら、このまま使うか、必要に応じて自分の運用しやすい一意な ID に変えてから Firebase に登録してください。

例:
- Android: `com.yourname.uchinoko_diary`
- iOS: `com.yourname.uchinokoDiary`

## 3. FlutterFire CLI を使って Firebase を接続

公式セットアップ:
- https://firebase.google.com/docs/flutter/setup

必要なコマンド:

```bash
dart pub global activate flutterfire_cli
firebase login
flutterfire configure
```

`flutterfire configure` を実行すると、通常は次が自動で行われます。

- Firebase プロジェクト選択
- Android/iOS アプリ登録
- 設定ファイル作成
- `firebase_options.dart` の生成

## 4. 手動で設定する場合

FlutterFire CLI を使わない場合は、Firebase Console から各設定ファイルをダウンロードして配置します。

- Android: `google-services.json` を `android/app/google-services.json` に置く
- iOS: `GoogleService-Info.plist` を `ios/Runner/GoogleService-Info.plist` に追加する

ただし Flutter では CLI を使うほうが管理しやすいです。

## 5. 依存関係を取得

```bash
flutter pub get
```

## 6. 動作確認

1. Firebase Console で `Email/Password` が有効になっていることを確認
2. Firebase Console で `Google` が有効になっていることを確認
3. Android で Google ログインを使うなら、Firebase Console の Android アプリ設定に SHA-1 を登録する
4. Firebase Console で `Cloud Firestore` と `Cloud Storage` が有効になっていることを確認
5. アプリを起動
6. `新規登録` からメールアドレスとパスワードで登録、または `Googleでログイン` を試す
7. ログインできることを確認
8. 日記を作成して、別端末や別シミュレータでも同じアカウントなら見えることを確認

### Google ログインの補足

- Android で Google ログインを使うには、Firebase Console の Android アプリ設定へ SHA-1 を追加してください
- iOS で Google ログインを使うには、`GoogleService-Info.plist` に `CLIENT_ID` / `REVERSED_CLIENT_ID` が含まれていることを確認してください
- もし古い Firebase 設定ファイルを使っている場合は、Google プロバイダを有効にしたあとで設定ファイルを再ダウンロードしたほうが安全です

## 7. ルール設定の目安

Firestore / Storage を本番モードで作成した場合、権限エラーになることがあります。

開発中の最小ルール例:

### Firestore

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage

```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 補足

今のアプリでは、

- 認証: `Firebase Authentication`
- 日記本文: `Cloud Firestore`
- 日記写真: `Cloud Storage for Firebase`

を使います。

認証導入前に端末ローカルへ保存していた日記は、同じユーザーで初回ログインしたときに Firebase へ移行されます。
