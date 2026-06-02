# 強制アップデート設定

起動時に Firestore の設定を読み、古いアプリバージョンならアプリ内に入れないようにできます。

対象コード:

- `lib/update_gate_service.dart`
- `lib/update_required_page.dart`
- `lib/splash_screen.dart`

## Firestore に作るドキュメント

コレクション:

- `appConfig`

ドキュメント ID:

- `updateGate`

例:

```json
{
  "message": "最新版のアプリにアップデートしてください。",
  "ios": {
    "minimumVersion": "1.0.2",
    "minimumBuildNumber": 6,
    "storeUrl": "https://apps.apple.com/jp/app/id1234567890"
  },
  "android": {
    "minimumVersion": "1.0.2",
    "minimumBuildNumber": 6,
    "storeUrl": "https://play.google.com/store/apps/details?id=com.outasato.uchinokoDiary"
  }
}
```

## 各項目の意味

- `minimumVersion`
  - 必須の最低バージョン
  - 例: `1.0.2`
- `minimumBuildNumber`
  - 同じバージョン内でも特定ビルド未満を止めたいときに使う
  - 不要なら省略可能
- `storeUrl`
  - 更新ボタンで開くストア URL
- `message`
  - 画面に出す案内文
  - ルート直下でも、`ios` / `android` の中でも指定できます

## 反映されるタイミング

- アプリ起動時
- `SplashScreen` でチェック
- 条件に引っかかると更新画面へ進み、通常画面へは入れません

## Firestore ルールの注意

ログイン前に読むため、`appConfig/updateGate` は未ログインでも読み取れる必要があります。

例:

```text
match /appConfig/updateGate {
  allow read: if true;
}
```

他のデータは今までどおり制限したままで大丈夫です。

## よくある使い方

### まだ強制したくないとき

- `minimumVersion` を今の公開版以下にしておく

### 古い版を止めたいとき

例:
- 公開中: `1.0.1+5`
- 新公開: `1.0.2+6`

このとき Firestore を次にします。

```json
{
  "ios": {
    "minimumVersion": "1.0.2",
    "minimumBuildNumber": 6,
    "storeUrl": "https://apps.apple.com/jp/app/id1234567890"
  }
}
```

すると `1.0.1+5` のユーザーは更新画面に固定されます。
