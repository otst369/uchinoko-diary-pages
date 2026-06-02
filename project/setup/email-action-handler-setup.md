# メール認証ページを完全日本語にする手順

このリポジトリには、Firebase の標準 `Verify Email Address` ページの代わりに使える日本語ページを追加しています。

- ページ本体: `docs/email-action.html`
- Hosting 設定: `firebase.json`

## 1. 何が変わるか

Firebase の英語ページではなく、`うちの子日記` 用の日本語ページが開くようになります。

- 見出し
- 説明文
- エラー文言
- 認証完了時の案内

を全部日本語にしています。

## 2. まずやること

Firebase Hosting に `docs/` を公開します。

例:

```bash
firebase use uchinoko-diary-37e36
firebase deploy --only hosting
```

公開URLの例:

- `https://uchinoko-diary-37e36.web.app/email-action.html`
- `https://uchinoko-diary-37e36.firebaseapp.com/email-action.html`

## 3. Firebase Console で差し替える

1. Firebase Console を開く
2. `Authentication`
3. `Templates`
4. `メールアドレスを確認` のテンプレートを開く
5. `Action URL` または `カスタム アクション URL` を編集
6. 次のどちらかを入れる

```text
https://uchinoko-diary-37e36.web.app/email-action.html
```

または

```text
https://uchinoko-diary-37e36.firebaseapp.com/email-action.html
```

保存したら、新しく送る認証メールからこの日本語ページが使われます。

## 4. 確認方法

1. アプリで確認メールを再送する
2. 新しいメールを開く
3. リンクを押す
4. 英語ではなく日本語ページが出ることを確認する
5. 認証後、アプリに戻って `メール認証が完了したら押す` を押す

## 5. 注意

- すでに届いている古いメールは、古いURLのままなことがあります
- 必ず `再送した新しいメール` で確認してください
- `firebase deploy --only hosting` は、その Firebase Hosting の公開内容を `docs/` ベースで更新します

もしすでに別のサイトを同じ Hosting に公開しているなら、その構成に合わせて `email-action.html` だけ組み込んでください。
