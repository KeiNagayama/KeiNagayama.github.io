# PC 設定

日時：2021/02/26 ~ 2021/03/01
環境：Windows10, version 1903 (OS build 18362.207) 



## 初期画面

インストラクションに従えば良い．ざっと，以下の設定を行う．

- アカウント設定：個人用を選択し，Microsoft Account を設定
- サインイン設定：指紋，PIN を設定



## 必須インストール

- TTInstaller: 大学用を選択
  - ウイルスソフト
  - Microsoft Office
  - Microsoft Office Activation Tool（ライセンス登録）
  - Adobe DC（PDF）
  - Adobe illustrator CC
- WSL (windows subsystem for Linux) 上に Jupyter を入れる
- VPN用の何か．OCWiから．



### WSL2 の手動インストール

1. 環境の更新

   ```
   更新前：1903 (OS Build 18362.207)
   更新後: 20H2 (OS Build 19042.844)
   
   WSL2の要件は満たしていたが，WSLのコマンドが使えなかった．
   最新版に更新すると問題なく通る．(OS Build 1)
   ```

2. Windows Insider Program に入る

   ```
   1. Windowsの設定 > 更新とセキュリティ > Windows Insider Program
   2. 開始する（Get Start）をクリック
   3. 出てくる文章に同意し、Windowsアカウントを紐づける
   4. Insiderの設定でスロー（推奨）をクリック
   5. 再起動
   ```

3. Microsoft 公式の [手動でインストール ](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#manual-installation-steps)に従う．

   管理者権限でPowerShellを開き，手順1~7をそのまま実行．

   ```sh
   # 手順1: Linux for Windows Subsystemを有効化
   $ dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   
   # 手順2: wsl2実行に関する要件の確認（上記の更新により完了済）
   
   # 手順3: 仮想マシン機能の有効化
   $ dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   
   # 手順4: Linuxカーネル更新プログラムをダウンロード
   https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package
   
   # 手順5: WSL2をdefault-versionに設定
   $ wsl --set-default-version 2
   
   # 手順6: Microsoft StoreからUbuntuを入れる
   https://www.microsoft.com/store/productId/9NBLGGH4MSV6
   
   # (Ubuntu/WSL2の確認)
   $ wsl -l -v
     NAME    STATE    VERSION
   * Ubuntu  Stopped  2
   
   # 手順7: Ubuntuを起動
   username, passwordを設定
   ```

   

### Ubuntu 上の設定

- gcc を入れるために，以下のコマンドを実行する．

  ```sh
  $ sudo apt update
  $ sudo apt upgrade
  $ sudo apt install build-essential
  ```

  注意：Ubuntu上ではcmdが使えない．ペーストのためにcmd+Vとしても^Vが出力される．

- AnacondaでPython-JupyterLab環境を入れる．参考：https://www.virment.com/setup-anaconda-python-jupyter-ubuntu/

  ```sh
  # 1: Anacondaのインストール
  $ wget https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh  # 最新版を入れる
  $ bash Anaconda3-2020.11-Linux-x86_64.sh  # yesと打ち続ける
  $ source ~/.bashrc                        # 変更を反映
  $ conda -V                                # condaコマンドを確認 (conda 4.9.2)
  
  # 2: Anaconda仮想環境の構築（やらなくても良い）
  $ conda update -n base -c defaults conda       # condaの更新
  $ conda create --name env_20210301 python=3.8  # 仮想環境を構築．環境名はenv_20210301とする
  $ conda activate env_20210301                  # 仮想環境の切替
  $ conda info -e                                # 仮想環境一覧を確認
  
  # (conda仮想環境名の変更)
  $ conda create -n NEW_NAME --clone PREVIOUS_NAME
  $ conda remove -n PREVIOUS_NAME --all
  
  # 3: JupyterLab環境の構築
  $ conda install numpy matplotlib jupyterlab  # 使いそうなパッケージをインストール
  $ conda install pandas networkx              # おまけ
  
  # labコマンドの作成
  $ mkdir ~/bin  # 自作コマンド用ディレクトリを用意
  $ cd ~/bin
  $ vi lab
  
  # labに以下を書き込む
  #!/bin/sh
  cd [作業ディレクトリ]
  echo http://localhost:8888 | clip.exe                       # clipboardにリンクをコピー
  jupyter lab --no-brower --port=8888 --NotebookApp.token=''  # jupyterlabを起動
  
  # labに実行権限を付与
  $ chmod +x lab
  
  # ~/.bashrcに以下を書き込み，自作コマンドのパスを通す
  export PATH='~/bin:$PATH'
  
  # 4: 確認
  $ lab  # ブラウザを開いてペーストすると，jupyterlabが立ち上がる
  ```

  

## アプリインストール

- Google Chrome
- Discord
- Zoom Client for Meetings
- [Not yet] TeX
- [Not yet] Mendeley（論文管理）



## 環境設定

### 済

- タッチパッド
  - 感度最大化
  - カーソル移動速度最大化
- 文字入力速度の最大化
- 既定ブラウザの変更

### やりたいこと

- 外付けキーボード，マウスが欲しい
- キーボードのカスタマイズ
- コマンド設定


