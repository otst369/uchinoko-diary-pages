# iOS リリース署名設定

このプロジェクトの iOS 側は、すでに次の値で準備されています。

- Bundle ID: `com.outasato.uchinokoDiary`
- Signing Style: `Automatic`
- Firebase 設定ファイル: `ios/Runner/GoogleService-Info.plist`

対象ファイル:

- [ios/Runner.xcodeproj/project.pbxproj](../../../ios/Runner.xcodeproj/project.pbxproj)
- [ios/Runner/Info.plist](../../../ios/Runner/Info.plist)

## 1. Xcode で開く

Flutter では `xcodeproj` ではなく、`xcworkspace` を開きます。

```bash
open ios/Runner.xcworkspace
```

## 2. Team を設定する

Xcode で次の順に開きます。

1. 左の `Runner` を選ぶ
2. 真ん中上の `Runner` ターゲットを選ぶ
3. `Signing & Capabilities` タブを開く
4. `Automatically manage signing` を ON のままにする
5. `Team` に自分の Apple Developer アカウントを選ぶ

ここでエラーが消えれば、署名設定はほぼ完了です。

## 3. Bundle Identifier を確認する

`Signing & Capabilities` または `General` で、次を確認します。

```text
com.outasato.uchinokoDiary
```

もし Apple Developer 側でこの ID が使えない場合は、別の一意なものへ変更します。

例:

```text
com.outasato.uchinokodiary
```

変更した場合は、Firebase 側の iOS アプリ登録も同じ値へ合わせ直す必要があります。

## 4. 実機で 1 回ビルド確認

Xcode で iPhone 実機を選んで `Product > Run` を実行します。

ここで確認したいこと:

- 起動する
- Firebase ログインできる
- 写真選択できる
- アルバム画面が開く

## 5. Archive を作る

実機 or `Any iOS Device (arm64)` を選んだ状態で:

1. `Product`
2. `Archive`

成功すると `Organizer` が開きます。

## 6. App Store Connect へ出す

`Organizer` から:

1. `Distribute App`
2. `App Store Connect`
3. `Upload`

で進めます。

## 7. Flutter コマンドで確認したいとき

署名なしのリリースビルド確認:

```bash
flutter build ios --release --no-codesign
```

署名込みの IPA 作成は、Xcode 側の Team 設定が終わったあとに行います。

```bash
flutter build ipa
```

## よくある詰まりポイント

- `Runner.xcodeproj` を開いてしまう
  - 正しくは `Runner.xcworkspace`
- Team が未設定
- Bundle ID が Apple Developer 側で使えない
- Firebase の iOS Bundle ID と Xcode の Bundle ID がずれている

## 今やること

1. `open ios/Runner.xcworkspace`
2. `Signing & Capabilities` で `Team` を選ぶ
3. 実機で 1 回 Run
4. `Product > Archive`
