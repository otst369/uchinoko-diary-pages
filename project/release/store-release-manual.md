# ストア公開 手順書

最終更新: 2026-04-18

この手順書は、うちの子日記をこれから公開するための「本当に最初から」の流れを、迷いにくい順番でまとめたものです。

---

## 0. いまの前提

このプロジェクトでは、すでに次ができています。

- Android の `app-release.aab` は生成済み
- iPhone 実機 `Run` は確認済み
- Git / GitHub 管理は導入済み
- 公開ページ用の URL は用意済み

使う URL:

- プライバシーポリシー  
  `https://otst369.github.io/uchinoko-diary-pages/privacy.html`
- サポート  
  `https://otst369.github.io/uchinoko-diary-pages/support.html`
- アカウント削除  
  `https://otst369.github.io/uchinoko-diary-pages/delete-account.html`

---

## 1. まず最初にやること

### 1-1. 公開ページの URL が本当に開くか確認

ブラウザで次の 3 本を開きます。

- `https://otst369.github.io/uchinoko-diary-pages/privacy.html`
- `https://otst369.github.io/uchinoko-diary-pages/support.html`
- `https://otst369.github.io/uchinoko-diary-pages/delete-account.html`

3 本とも開けば OK です。

### 1-2. 実機で最終確認

最低でも次を 1 回通します。

- 新規登録
- メール認証
- ログイン
- Google ログイン
- 日記作成
- 写真 1〜3 枚保存
- アルバム選択
- PDF 保存
- アカウント削除

---

## 2. App Store と Google Play の大きな違い

### Google Play

比較的すぐ進められます。

- Play Console に入れる
- `app-release.aab` を使える
- プライバシーポリシー URL
- アカウント削除 URL

を入れていけば進められます。

### App Store

App Store Connect に入るには、Apple Developer Program の権限が必要です。

今のスクショの状態は、

- Apple Developer Program のメンバーではない
  または
- App Store Connect のチームに招待されていない

ため、ここで止まっています。

Apple 公式:
- Programs overview  
  https://developer.apple.com/help/account/membership/programs-overview/
- Program enrollment  
  https://developer.apple.com/help/account/membership/program-enrollment

つまり、今のおすすめ順はこうです。

1. Google Play を先に進める
2. Apple Developer Program を有効にする
3. App Store Connect に戻る

---

## 3. Google Play 公開の手順

### 3-1. Play Console に入る

1. `https://play.google.com/console/`
2. 対象アプリを開く

### 3-2. Google からの連絡方法を入れる

開発者アカウント作成の途中で、`Google からの連絡方法` の入力があります。

入れるもの:

- 担当者名: 自分の本名
- 連絡先メールアドレス: 普段確認できるメールアドレス
- メールアドレスを確認: 同じメールアドレスをもう一度入れる
- 使用する言語: `日本語`
- 連絡先電話番号: `+81` 形式  
  例: `09012345678` → `+819012345678`

補足:

- ここは Google からの連絡用で、ストアにそのまま公開される情報ではありません
- 電話番号は先頭の `0` を取り、ハイフンなしで入れます

### 3-3. ストアに表示する連絡先を入れる

1. 左メニュー `ストアの設定`
2. `ストアの掲載情報に表示する連絡先の詳細`
3. 次を入れる

- メールアドレス: 問い合わせ用メールアドレス
- ウェブサイト: `https://otst369.github.io/uchinoko-diary-pages/support.html`


Google 公式:
- Store listing contact details  
  https://support.google.com/googleplay/android-developer/answer/13634081

### 3-4. プライバシー ポリシーを入れる

1. 左メニュー `ポリシーとプログラム`
2. `アプリのコンテンツ`
3. `プライバシー ポリシー` 欄に次を入れる

`https://otst369.github.io/uchinoko-diary-pages/privacy.html`

Google 公式:
- User Data / Privacy Policy  
  https://support.google.com/googleplay/android-developer/answer/9888076

### 3-5. アカウント削除 URL を入れる

1. 左メニュー `ポリシーとプログラム`
2. `アプリのコンテンツ`
3. `データ セーフティ`
4. `データの削除` または `アカウント削除` の質問へ進む
5. アカウント作成があるか → `はい`
6. ウェブリンクに次を入れる

`https://otst369.github.io/uchinoko-diary-pages/delete-account.html`

Google 公式:
- Account deletion requirement  
  https://support.google.com/googleplay/android-developer/answer/13327111
- User Data policy  
  https://support.google.com/googleplay/android-developer/answer/10144311

### 3-6. データ セーフティを埋める

このアプリで最低限考える項目:

- メールアドレス
- 写真
- 日記本文
- ユーザー ID

質問に沿って、次を目安に答えます。

- 暗号化されて送信される → `はい`
- アカウント削除できる → `はい`
- データ削除 URL あり → `はい`

Google 公式:
- Data safety form  
  https://support.google.com/googleplay/android-developer/answer/10787469

### 3-7. メインのストアの掲載情報を埋める

必要なもの:

- アプリ名
- 短い説明
- 詳しい説明
- アイコン
- スクリーンショット

説明文のたたき台:
- [App Store Metadata Draft](app-store-metadata-draft.md)

### 3-8. Android ビルドをアップロード

使うファイル:

- [app-release.aab](../../../build/app/outputs/bundle/release/app-release.aab)

Play Console で:

1. `テスト` か `本番環境`
2. `新しいリリースを作成`
3. `app-release.aab` をアップロード

---

## 4. App Store 公開の手順

### 4-1. まず Apple Developer Program を有効にする

今の App Store Connect のエラーは、ここが未完了だからです。

必要:

- Apple Developer Program に加入
  または
- その Team に招待される

Apple 公式:
- Programs overview  
  https://developer.apple.com/help/account/membership/programs-overview/
- Program enrollment  
  https://developer.apple.com/help/account/membership/program-enrollment

### 4-2. App Store Connect に入れるようになったら

1. `https://appstoreconnect.apple.com/`
2. `マイApp`
3. `+`
4. `新規App`

入れるもの:

- 名前: `うちの子日記`
- プライマリ言語: `Japanese`
- Bundle ID: `com.outasato.uchinokoDiary`
- SKU: 例 `uchinoko-diary-ios-001`

Apple 公式:
- App information  
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-information

### 4-3. App 情報を入れる

入れる欄:

- 名前
- サブタイトル
- カテゴリ
- プライバシーポリシー URL

Privacy Policy URL:

`https://otst369.github.io/uchinoko-diary-pages/privacy.html`

### 4-4. バージョン情報を入れる

`提出の準備` 相当の画面で次を入れます。

- 説明

- キーワード
- サポート URL
- マーケティング URL（任意）

Support URL:

`https://otst369.github.io/uchinoko-diary-pages/support.html`

Marketing URL（任意）:

`https://otst369.github.io/uchinoko-diary-pages/`

Apple 公式:
- Platform version information  
  https://developer.apple.com/help/app-store-connect/reference/platform-version-information/

### 4-5. App Privacy を入れる

このアプリで最低限確認するもの:

- メールアドレス
- 写真
- 日記本文
- ユーザー ID

Privacy Policy URL は必須です。  
削除やデータ管理について示す URL は任意ですが、必要なら `delete-account.html` を補助的に使えます。

Apple 公式:
- App privacy  
  https://developer.apple.com/help/app-store-connect/reference/app-privacy
- Manage app privacy  
  https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy

### 4-6. 審査用アカウントを用意

このアプリはログイン必須なので、審査用に次を用意します。

- テスト用メールアドレス
- テスト用パスワード

Google ログインだけより、メールログインのテストアカウントがあるほうが審査はスムーズです。

### 4-7. iOS の Archive / Upload

1. Xcode で `ios/Runner.xcworkspace` を開く
2. Team を App Store 配布できる Team にする
3. 実行先を `Any iOS Device (arm64)`
4. `Product > Archive`
5. `Organizer > Distribute App`
6. `App Store Connect > Upload`

Apple 公式:
- Upload builds  
  https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/

---

## 5. 今日このあとやる順番

### Apple Developer Program にまだ入っていない場合

1. Google Play の入力を進める
2. スクリーンショットを撮る
3. Apple Developer Program を有効化する
4. App Store Connect に戻る

### Apple Developer Program に入れる場合

1. App Store Connect に入る
2. App 情報を作る
3. Privacy Policy / Support URL を入れる
4. Archive / Upload

---

## 6. 最後に確認するもの

- `privacy.html` が開く
- `support.html` が開く
- `delete-account.html` が開く
- Android `app-release.aab` がある
- iPhone 実機 Run が通る
- スクリーンショットが揃っている
- 審査用アカウントがある

---

## 7. 迷ったら最初に見るファイル

- [Release Checklist](release-checklist.md)
- [App Store Launch Plan](app-store-launch-plan.md)
- [App Store Metadata Draft](app-store-metadata-draft.md)
- [docs/privacy.html](../../privacy.html)
- [docs/support.html](../../support.html)
- [docs/delete-account.html](../../delete-account.html)
