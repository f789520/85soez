from asyncio.windows_events import NULL
from pickle import NONE
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import re
import json
import urllib.request as req
import requests
from collections.abc import Mapping
from bs4 import BeautifulSoup
import bs4
# import bs4 # 載入pip install beautifulsoup4套件 這個套件叫bs4 請他幫我們做解析

#  FIREBASE
# https://pyradise.com/10%E5%88%86%E9%90%98%E8%B3%87%E6%96%99%E5%BA%AB%E6%93%8D%E4%BD%9C-%E6%96%B0%E5%A2%9E%E8%B3%87%E6%96%99-b96db385e1e4
# 引用必要套件
# 引用私密金鑰
# path/to/serviceAccount.json 請用自己存放的路徑
cred = credentials.Certificate('serviceAccount.json')
# 初始化firebase，注意不能重複初始化
firebase_admin.initialize_app(cred)
# 初始化firestore
db = firestore.client()


# POSTMAN 出來的code
# 之後改pg(page)

payload = {}
headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cookie': '_ga=GA1.1.196998217.1648990369; powernpbo0=%AE%E7%A6%CB%AD%5D%B0%CF%B7s%A6%CB; check0=%A1%B443309; select00=11112012%2F07; price0=1041110506029%A1i1%2E0%A1j%A1%B3%A1%B3%A1%B3%A1%B3%2F%A1%B3%A1%B3%2F%A1%B3%A1%B3%A1%E3%A1%B3%A1%B3%A1%B3%A1%B3%2F%A1%B3%A1%B3%2F%A1%B3%A1%B3%A1%B3%A1%B3%A1%B3%A1%B4%B7s%A6%CB%2E%A5x%A4%A4%2E%AE%E7%B6%E9; _fbp=fb.2.1648990368684.1797440529; ASPSESSIONIDCUQRTSQQ=MOOGCNGBCHEMFMILONDMJHAD; __RequestVerificationToken=mvQotFRRY-jmGHZEqsJddSzpq8Y-AWvWCge8TYgSVjF_7bZS_5HUyzuS71HcqrYMEyN4Kz0Bs_9aW1cJY4FZlYl6byeMTH2ktINTjNi5Ioc1; ASP.NET_SessionId=0kma4qdjxtluyy5hvltqcn3h; ASPSESSIONIDCQQRTSQQ=HJBHCNGBGOEHFKPCFOEJEEMJ; _ga_FEZDZVPB7B=GS1.1.1652250224.22.1.1652258480.0',
  'Origin': 'https://www.104woo.com.tw',
  'Pragma': 'no-cache',
  'Referer': 'https://www.104woo.com.tw/',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"'
}
for pg in range(1, 2):
    try:

        url = "https://www.104woo.com.tw/Search/Index?1=1&pg=" + \
            str(pg)+"&ps=10&sc=4,1"
        response = requests.request("GET", url, headers=headers, data=payload)
        # print(response.text) #印成TEXT
        # with open('891test.html', 'w+', encoding='utf-8') as f:
        #     f.write(response.text)  # 印成HTML查看印出樣子

        # 給他資料，並告訴他這是html，這是網頁的整個資料
        Soup = bs4.BeautifulSoup(response.text, "html.parser")

        # label=Soup.find("label",class_="ck_container") # BeautifulSoup給的工具: 尋找 Class="ck_container" 的 label標籤
        # ids=Soup.find("input",class_="objCheck")
        # print("Soup",Soup)

        # 跑迴圈
        for x in Soup.find_all('input'):  # 網頁的整個資料 找到input標籤
            try:

                # print(Soup.find_all('input'))
                # print(x)
                ids = x.get('ids')
                print("ids", ids)  # 得到搜尋網址中的 ids 有我要的搜尋網址參數  eg:SCD_51829
                if ids == None:  # 如果沒有ids (ids=None) 跳下一個迴圈
                    continue
                # 如果有ids資料就拆參數
                # print(type(x.get('ids')))
                # print(x.get('ids').split("_"))  #得到搜尋網址中的 c & no 拆開
                # bs4 官網 https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/
                print(x.get('ids').split("_")[0])  # 得到搜尋網址中的 參數 c
                arg_c = x.get('ids').split("_")[0]
                print(x.get('ids').split("_")[1])  # 得到搜尋網址中的 參數 no
                arg_no = x.get('ids').split("_")[1]
                print("arg_c", arg_c)

                # 先看看單一個的等等回來處理迴圈
                detail_url = "https://www.104woo.com.tw/Detail/Index?c=" + \
                    arg_c+"&no="+arg_no  # 將上面得到的參數 c & no 放到Detail網址列
                detail_response = requests.request(
                    "GET", detail_url, headers=headers, data=payload)
                print("detail_url", detail_url)
                # print(detail_response.text) #印成TEXT
                # with open(str('Detail'+'.html'), 'w+', encoding = 'utf-8') as f:
                #     f.write(detail_response.text)  #印成HTML查看印出樣子

            # 如果不知道錯誤的型別，只想印出錯誤資訊，除了單純用 except，也可以使用「except Exception」，將例外的資訊全部放在裡面。
            # TEST @單一個的-------------------------------
            # detail_url = "https://www.104woo.com.tw/Detail/Index?c=KSD&no=285691"  # TEST

            # 內容都在 div class="container-fluid-detail fade-in"
                detail_Soup = bs4.BeautifulSoup(
                    detail_response.text, "html.parser")
            except Exception:
                print('ids發生錯誤')
                pass
            try:
                # 表頭
                section_top = detail_Soup.find(
                    "div", class_="row align-items-end section-custom section-top")
                # print(section_top)
                # .contents[0] 表示子節點 / .string 內容string /.get("")標籤屬性
            except Exception:

                print('表頭發生錯誤')
                pass

            try:
                # 表頭右邊
                section_top_right = detail_Soup.find(
                    "div", class_="col-lg-4 order-lg-8 align-self-end text-right")
                # print("section_top_right.contents[1]",section_top_right.contents[1])
                # print("section_top_right.contents[2]",section_top_right.contents[2])
                # print("section_top_right.contents[3]",section_top_right.contents[3])
                # print("section_top_right.contents[4]",section_top_right.contents[4])
                # print("section_top_right.contents[5]",section_top_right.contents[5])
                # print("section_top_right.contents[6]",section_top_right.contents[6])
                # print("section_top_right.contents[7]",section_top_right.contents[7])
                # print("section_top_right.contents[8]",section_top_right.contents[8])
                print("section_top_right.contents9]",
                    section_top_right.contents[9].contents[0].string)  # 公設比
                public_build_ratio = section_top_right.contents[9].contents[0].string
            except Exception:
                public_build_ratio = ""
                print('公設比發生錯誤')
                pass

            try:
                print("section_top_right.contents[11]",
                    section_top_right.contents[11].string)  # 主建物
                main_building = section_top_right.contents[11].string
            except Exception:
                main_building = ""
                print('主建物發生錯誤')
                pass

            try:
                print("section_top_right.contents[13]",
                    section_top_right.contents[13].contents[0])  # 總坪數
                total_area = section_top_right.contents[13].contents[0]
            except Exception:
                total_area = ""
                print('總坪數發生錯誤')
                pass

            try:
                # 表頭左邊
                section_top_left = detail_Soup.find(
                    "div", class_="col-lg-8 order-lg-1")
                # for i in range(1, 15):
                #     print("section_top_left.contents["+str(i)+"]",section_top_left.contents[i])
            except Exception:
                section_top_left = ""
                print('表頭左邊發生錯誤')
                pass

            try:
                # 法院
                print(
                    "section_top_left.contents[1]", section_top_left.contents[1].contents[0].strip())
                court = section_top_left.contents[1].contents[0].strip()
            except Exception:
                court = ""
                print('法院發生錯誤')
                pass

            try:
                # 人氣數量
                print(
                    "section_top_left.contents[1]", section_top_left.contents[1].contents[5].contents[1].string)
                popular = section_top_left.contents[1].contents[5].contents[1].string
            except Exception:
                popular = ""
                print('人氣數量發生錯誤')
                pass

            try:
                # 地址 高雄市新興區林森一路252號14樓<14>
                print(
                    "section_top_left.contents[3]", section_top_left.contents[3].contents[1])
                address = section_top_left.contents[3].contents[1]
            except Exception:
                address = ""
                print('地址發生錯誤')
                pass

            try:
                # thisId 110逸116965
                print(
                    "section_top_left.contents[5]", section_top_left.contents[5].get("value"))
                thisId = section_top_left.contents[5].get("value")
            except Exception:
                thisId = ""
                print('thisId發生錯誤')
                pass

            try:
                # 網址 c
                print(
                    "section_top_left.contents[7]", section_top_left.contents[7].get("value"))
                url_c = section_top_left.contents[7].get("value")
            except Exception:
                url_c = ""
                print('網址 c發生錯誤')
                pass

            try:
                # city 高雄市
                print(
                    "section_top_left.contents[9]", section_top_left.contents[9].get("value"))
                city = section_top_left.contents[9].get("value")
            except Exception:
                city = ""
                print('city發生錯誤')
                pass

            try:
                # 網址 no
                print(
                    "section_top_left.contents[11]", section_top_left.contents[11].get("value"))
                url_no = section_top_left.contents[11].get("value")
            except Exception:
                url_no = ""
                print('網址 no發生錯誤')
                pass

            try:
                # 第幾拍
                times = detail_Soup.find("font", class_="font-link-red").string
                print("times", times)
            except Exception:
                times = ""
                print('第幾拍發生錯誤')
                pass

            try:
                # 投標日期
                date_th = detail_Soup.find(
                    "span", attrs={"data-th": "投標日期"}).string
                print("date_th", date_th)
            except Exception:
                date_th = ""
                print('投標日期發生錯誤')
                pass

            try:
                # 投標時間
                time_th = detail_Soup.find(
                    "span", attrs={"data-th": "投標時間"}).string
                print("time_th", time_th)
            except Exception:
                time_th = ""
                print('投標時間發生錯誤')
                pass

            try:
                # 建坪
                building_area = detail_Soup.find(
                    "font", attrs={"title": "推算公設坪數"}).string
                print("building_area", building_area)
            except Exception:
                building_area = ""
                print('建坪發生錯誤')
                pass

            try:
                # 地坪
                lend_area = detail_Soup.find(
                    "span", attrs={"data-th": "地坪"}).contents[0].split(' ')[0]
                print("lend_area", lend_area)
            except Exception:
                lend_area = ""
                print('地坪發生錯誤')
                pass

            try:
                # 類建蔽率
                building_ratio = detail_Soup.find(
                    "a", attrs={"title": "類建蔽率"}).contents[0].string
                print("building_ratio", building_ratio)
            except Exception:
                building_ratio = ""
                print('類建蔽率發生錯誤')
                pass

            try:
                # 房屋單價
                house_per_price = detail_Soup.find(
                    "span", attrs={"data-th": "房屋單價"}).contents[0].strip()
                print("house_per_price", house_per_price)
            except Exception:
                house_per_price = ""
                print('房屋單價發生錯誤')
                pass

            try:
                # 總底價
                house_total_lowprice = ' '.join(detail_Soup.find(
                    "span", attrs={"data-th": "總底價"}).string.strip().split()).split(' ')[0]
                print("house_total_lowprice", house_total_lowprice.split(' ')[0])
            except Exception:
                house_total_lowprice = ""
                print('總底價發生錯誤')
                pass

            try:
                # 實價交易
                real_price = detail_Soup.find(
                    "font", attrs={"title": "實價交易歷史記錄"}).string.strip()
                print("real_price", real_price)
            except Exception:
                real_price = ""
                print('實價交易發生錯誤')
                pass

            try:
                # 保證金
                caution_money = detail_Soup.find(
                    "span", attrs={"data-th": "保證金"}).contents[0].strip()
                print("caution_money", caution_money)
            except Exception:
                caution_money = ""
                print('保證金發生錯誤')
                pass

            try:
                # 開標結果
                result_price = detail_Soup.find(
                    "span", attrs={"data-th": "開標結果"}).contents[0]
                print("result_price", result_price)
            except Exception:
                result_price = ""
                print('開標結果發生錯誤')
                pass

            try:
                # 公告現值 元/㎡
                open_price = detail_Soup.find(
                    "span", attrs={"data-th": "公告現值"}).contents[0].strip()
                print("open_price", open_price)
            except Exception:
                open_price = ""
                print('公告現值發生錯誤')
                pass

            try:
                # 拍後增值
                after_result_price = detail_Soup.find(
                    "span", attrs={"data-th": "拍後增值"}).contents[0]
                print("after_result_price", after_result_price)
            except Exception:
                after_result_price = ""
                print('拍後增值發生錯誤')
                pass

            try:
                # 屋齡
                house_years = detail_Soup.find(
                    "span", attrs={"data-th": "屋齡"}).contents[0].strip()
                print("house_years", house_years)
            except Exception:
                house_years = ""
                print('屋齡發生錯誤')
                pass

            try:
                # 社區名稱
                community_name = detail_Soup.find(
                    "span", attrs={"data-th": "社區名稱"}).contents[0].strip()
                print("community_name", community_name)
            except Exception:
                community_name = ""
                print('社區名稱發生錯誤')
                pass

            try:
                # 土地     https://iter01.com/60617.html 取得子節點的字串 字多
                contentLand = detail_Soup.find(
                    "div", attrs={"id": "contentLand"}).strings  # stripped_strings 去掉空白
                # print("contentLand", contentLand1)
                contentLand2 = ""
                for x in contentLand:
                    # print( x.strip())
                    contentLand2 = str(contentLand2)+x.strip()  # strip去掉空白
                print("contentLand2", contentLand2)
            except Exception:
                contentLand2 = ""
                print('土地發生錯誤')
                pass

            try:
                # 建物
                contentCase = detail_Soup.find(
                    "div", attrs={"id": "contentCase"}).strings
                # print("contentCase",contentCase)
                contentCase2 = ""
                for x in contentCase:
                    contentCase2 = str(contentCase2)+x.strip()
                print("contentCase2", contentCase2)
            except Exception:
                contentCase2 = ""
                print('建物發生錯誤')
                pass

            try:
                # 查封筆錄 字多
                contentRecord = detail_Soup.find(
                    "div", attrs={"id": "contentRecord"}).strings
                # print("contentCase",contentCase)
                contentRecord2 = ""
                for x in contentRecord:
                    contentRecord2 = str(contentRecord2)+x
                print("contentRecord2", contentRecord2)
            except Exception:
                contentRecord2 = ""
                print('查封筆錄發生錯誤')
                pass

            try:
                # 得標人查詢
                winner = detail_Soup.find(
                    "a", attrs={"title": "得標人查詢"}).contents[0].string
                print("winner", winner)
            except Exception:
                winner = ""
                print('得標人查詢發生錯誤')
                pass

            try:
                # 拍賣紀錄 字多
                record = detail_Soup.find(
                    "td", attrs={"class": "record"}).strings
                # print("record", record)
                record2 = ""
                for x in record:
                    record2 = str(record2)+x
                print("record2", record2)
            except Exception:
                record2 = ""
                print('拍賣紀錄發生錯誤')
                pass

                # 謄本資料????????????????????????????????? 有空再取得

            try:
                # 土地漲價總額 字多
                increase = detail_Soup.find(
                    "td", attrs={"class": "increase"}).strings
                # print("record", record)
                increase2 = ""
                for x in increase:
                    increase2 = str(increase2)+x
                print("increase2", increase2)
            except Exception:
                increase2 = ""
                print('土地漲價總額發生錯誤')
                pass

            try:
                # 社區資料 使用執照
                license = detail_Soup.find(
                    "a", attrs={"title": "使用執照"}).contents[0].string
                print("license", license)
            except Exception:
                license = ""
                print('社區資料 使用執照發生錯誤')
                pass

                # 實價預估投報率????????????????????????????????? 有空再取得

            try:
                # 照片
                # imgs = detail_Soup.find(
                #     "img", attrs={"id": "M1"}).get("src")
                # print("imgs", imgs)
                img_list = []
                i = 1
                for i in range(1, 31):
                    try:
                        x = detail_Soup.find(
                            "img", attrs={"id": "M"+str(i)}).get("src").strip()
                        if x == "":  # 去掉空字串
                            continue
                        img_list.append(x)
                    except:
                        pass
                print("img_list", img_list)
            except Exception:
                img_list = ""
                print('照片發生錯誤')
                pass

            try:
                # 人氣 主建物 公告坪數
                top_left = detail_Soup.find(
                    "div", attrs={"class": "col-lg-4 order-lg-8 align-self-end text-right"}).stripped_strings
                print("top_left", top_left)
                top_left2 = ""
                for x in top_left:
                    top_left2 = str(top_left2)+x.strip()
                print("top_left2", top_left2)
            except Exception:
                top_left2 = ""
                print('人氣 主建物 公告坪數發生錯誤')
                pass

            try:
                doc = {
                    "ids": ids,
                    'arg_c': arg_c,
                    'arg_no': arg_no,
                    "public_build_ratio": public_build_ratio,  # 公設比
                    "main_building": main_building,  # 主建物
                    "total_area": total_area,  # 總坪數
                    "court": court,  # 法院
                    "popular": popular,  # 人氣數量
                    "address": address,  # 地址
                    "thisId": thisId,  # thisId 110逸116965
                    "url_c": url_c,  # 網址 c
                    "city": city,  # city
                    "url_no": url_no,  # 網址 no
                    "times": times,  # 第幾拍
                    "date_th": date_th,  # 投標日期
                    "time_th": time_th,  # 投標時間
                    "building_area": building_area,  # 建坪
                    "lend_area": lend_area,  # 地坪
                    "building_ratio": building_ratio,  # 類建蔽率
                    "house_per_price": house_per_price,  # 房屋單價
                    "house_total_lowprice": house_total_lowprice,  # 總底價
                    "real_price": real_price,  # 實價交易
                    "caution_money": caution_money,  # 保證金
                    "result_price": result_price,  # 開標結果
                    "open_price": open_price,  # 公告現值 元/㎡
                    "after_result_price": after_result_price,  # 拍後增值
                    "house_years": house_years,  # 屋齡
                    "community_name": community_name,  # 社區名稱
                    "contentLand": contentLand2,  # 土地
                    "contentCase": contentCase2,  # 建物
                    "contentRecord": contentRecord2,  # 查封筆錄
                    "winner": winner,  # 得標人查詢
                    "record": record2,  # 拍賣紀錄
                    "increase": increase2,  # 土地漲價總額
                    "license": license,  # 社區資料
                    "img_list": img_list,  # 照片

                }
                print("doc", doc)
                # 寫入 FIRESTORE 資料庫
                # doc_ref = db.collection("soez").document(ids) 
                # doc_ref.set(doc) #FIRESTORE
          
                # 寫入 JSON 資料 要記得新增檔案 並寫一個空list
                with open('soezdata.json', 'r+', encoding='utf-8') as f:
                    json_data = json.load(f)
                print("djson_data", json_data,)
                json_data.append(doc)
                json_data=json.dumps(json_data, ensure_ascii=False)
                print("docensure_ascii=False", json_data)
                with open('soezdata.json', 'w+', encoding='utf-8') as f:
                    f.write(json_data) 
            except Exception:
                print('doc發生錯誤')
                pass
    except Exception:
        print('url 迴圈發生錯誤')
        pass




