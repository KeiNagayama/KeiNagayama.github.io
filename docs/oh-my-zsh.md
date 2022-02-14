# oh-my-zsh の導入

公式：[https://ohmyz.sh/](https://ohmyz.sh/)

環境：MacOS Catalina 以降，zsh

手順

1. インストール

   ```sh
   $ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

2. 元の zshrc を新しい zshrc に追記
   oh my zsh の installer は zshrc のコピーを `~/.zshrc.pre-oh-my-zsh` に取ったあと，新しく zshrc を作成します．新しい zshrc には元の zshrc の設定が書き込まれないため，自分で追記する必要があります．

   ```sh
   $ cat ~/.zshrc.pre-oh-my-zsh >> ~/.zshrc
   ```

   参考：https://github.com/ohmyzsh/ohmyzsh/issues/8877

3. Theme 設定（任意）
   https://github.com/ohmyzsh/ohmyzsh/wiki/Themes から好きなテーマを選び，zshrc の `ZSH_THEME="robbyrussell"` の右辺を変更する．僕は **af-magic** にしてあります．

復元

- oh my zsh の uninstall

  ```sh
  $ uninstall_oh_my_zsh
  ```

  とすると，元の zshrc が復元されます．

---

補足

- .zshrc は zsh が起動した際に自動的に読み込まれるファイルです．環境変数や alias をここに記述します．
  環境変数は指定したパスの下にあるコマンドをどこでも実行できるようにするもの，alias はコマンドに別名を与えるものです．

  ```sh
  # 環境変数の例
  export PATH="$HOME/.pyenv/bin:$PATH"　
  export PATH="/Users/<user_name>/opt/anaconda3/bin:$PATH"

  # aliasの例
  alias g++='g++ -std=c++17'
  alias jupyter='jupyter lab'
  ```

- .zshrc をエディタで開く方法
  ① Finder で `cmd+shift+.` を打つと，ドットから始まるファイル（隠しファイル）も表示されるようになります．非表示するにも同じコマンドを使います．
  ② Terminal で open コマンドを使う．-a オプションを使うとアプリケーションを指定してファイルを開けます．

  ```sh
  $ open -a "Visual Studio Code" ~/.zshrc
  $ open -a Atom ~/.zshrc
  ```
