# Developer Cheatsheet

最終更新: 2026-05-29

このプロジェクトで日常的によく使う `Git` と `Firebase Console` の最短メモを 1 つにまとめています。

## Git

### まずこれだけ

```bash
git status
git add .
git commit -m "変更内容"
git push
```

- `git status`
  今どのファイルが変わっているかを見る
- `git add .`
  今回保存したい変更をまとめる
- `git commit -m "変更内容"`
  今の状態をローカルに保存する
- `git push`
  GitHub に送る

### いちばん基本の流れ

1. コードを直す
2. 状態を見る

```bash
git status
```

3. 保存対象に入れる

```bash
git add .
```

4. ローカルに保存する

```bash
git commit -m "アルバムUIを調整"
```

5. GitHub に送る

```bash
git push
```

### よく使うコマンド

```bash
git diff
git log --oneline
git log --oneline -1
git pull
git remote -v
```

### 安全のために覚えておくこと

- `git status` を見てから `git add .` する
- パスワードや秘密鍵は GitHub に上げない
- 分からないまま `git reset --hard` は使わない
- `rm` や `git checkout --` でいきなり消さない

## Firebase Console

対象プロジェクト:
- `uchinoko-diary-37e36`

Firebase Console:

```text
https://console.firebase.google.com/
```

### まず見る場所

- `Authentication`
- `Firestore Database`
- `Storage`
- `プロジェクトの設定`

### Authentication

場所:

```text
Firebase Console
→ Authentication
```

確認したいこと:

- 登録済みユーザー
- `メール / パスワード` が ON
- `Google` が ON

### Firestore Database

場所:

```text
Firebase Console
→ Firestore Database
→ データ
```

このアプリの主な構造:

```text
users
└── {userId}
    ├── diaries
    │   └── {YYYY-MM-DD}
    └── weeklyAlbums
        └── {YYYY-MM-DD}
```

### Storage

場所:

```text
Firebase Console
→ Storage
→ ファイル
```

このアプリの保存先:

```text
users/{userId}/diaries/{YYYY-MM-DD}/{timestamp}_{slot}.jpg
```

### プロジェクトの設定

場所:

```text
左上の歯車
→ プロジェクトの設定
```

確認したい値:

- Android package name: `com.outasato.uchinoko_diary`
- iOS bundle ID: `com.outasato.uchinokoDiary`
- `google-services.json`
- `GoogleService-Info.plist`
- Android の SHA-1

### このアプリでよく見る導線

- ユーザーが作られたか
  - `Authentication → ユーザー`
- 日記が保存されたか
  - `Firestore Database → データ → users → {uid} → diaries`
- アルバムが保存されたか
  - `Firestore Database → データ → users → {uid} → weeklyAlbums`
- 写真が保存されたか
  - `Storage → ファイル → users → {uid} → diaries`

## Related Docs

- [Firebase Setup](../setup/firebase-setup.md)
- [Database Schema](../reference/database-schema.md)
- [Release Checklist](../release/release-checklist.md)
