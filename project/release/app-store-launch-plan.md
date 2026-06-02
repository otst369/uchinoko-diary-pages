# App Store 公開手順

最終更新: 2026-04-15

## いまの状態

- Android の `appbundle` は生成済み
- iPhone 実機で `Run` は確認済み
- Firebase ログイン、日記保存、アルバム、PDF 保存がアプリ内で動作
- Git / GitHub 管理も導入済み

## まだ必要なこと

- Apple Developer Program の配布権限
- App Store Connect のアプリ登録
- App Store 用メタデータ入力
- プライバシーポリシー URL
- iOS の最終 `Archive / Upload`

## まず確認すること

もし Xcode の Team が `Personal Team` のままなら、App Store 配布にはまだ進めません。

Apple 公式:
- Apple Developer Program membership overview  
  https://developer.apple.com/help/account/membership/programs-overview/

## 手順

### 1. Apple Developer Program を確認

- App Store 配布に使う Team が有効か確認する
- Xcode の `Signing & Capabilities` で Team が正しいか確認する

### 2. App Store Connect で新しいアプリを作る

必要な項目:

- Name: `うちの子日記`
- Primary Language: `Japanese`
- Bundle ID: `com.outasato.uchinokoDiary`
- SKU: 例 `uchinoko-diary-ios-001`

Apple 公式:
- App information  
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/

### 3. アプリ情報を埋める

最低限必要なもの:

- App Name
- Subtitle
- Privacy Policy URL
- Category
- Age Rating
- Support URL

補足:

- `Privacy Policy URL` は iOS アプリで必須
- `Support URL` は GitHub Pages や Notion でもよい

### 4. ビルドを Archive してアップロード

Xcode:

1. `ios/Runner.xcworkspace` を開く
2. 実行先を `Any iOS Device (arm64)` にする
3. `Product > Archive`
4. `Organizer > Distribute App`
5. `App Store Connect > Upload`

Apple 公式:
- Upload builds  
  https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/

### 5. App Store Connect でビルドを選ぶ

- 対象バージョンを作る
- アップロードされた build を紐づける

### 6. App Privacy を入力

このアプリでは、少なくとも次の観点を確認する必要があります。

- メールアドレス
- ユーザーが追加する写真
- アプリ機能のためのデータ保存

Apple 公式:
- Manage app privacy  
  https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/

### 7. スクリーンショットを入れる

最低でも:

- iPhone 6.9 inch
- iPhone 6.5 inch

に対応する画像を用意すると進めやすいです。

### 8. レビュー情報を入れる

このアプリはログイン必須なので、レビュー用に以下を準備します。

- テスト用メールアドレス
- テスト用パスワード
- 必要なら Google ログイン以外の確認手順

### 9. 審査提出

- 価格設定
- 配信地域
- App Privacy
- スクリーンショット
- 説明文

が埋まったら `Submit for Review`

Apple 公式:
- Submit for review  
  https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-for-review/

## このプロジェクトで次にやるとよいこと

1. プライバシーポリシー URL を公開できる場所に置く
2. ストア説明文を決める
3. スクリーンショットを撮る
4. Xcode の `Archive` が App Store 用 Team で通るか確認する

## 補足

`flutter build ipa --release` は最終確認として使えますが、実運用では Xcode の `Archive` から App Store Connect に送る流れのほうが分かりやすいです。
