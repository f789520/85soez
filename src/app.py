from asyncio.windows_events import NULL
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import re

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

# doc = {
#     'arg_c': arg_c,
#     'arg_no': arg_no
# }

# 建立文件 必須給定 集合名稱 文件id
# 即使 集合一開始不存在 都可以直接使用
# 語法
# doc_ref = db.collection("集合名稱").document("文件id")
# doc_ref = db.collection("85soez").document(ids)

# 定義指定文件的路徑 >這段不知道啥意思
# 特別注意doc_path一定要指向文件
# doc_path = "/pyradise_students/student_01"
# 透過路徑，產生參考
# doc_ref = db.document(doc_path)

# doc_ref提供一個set的方法，input必須是dictionary
# doc_ref.set(doc)


# POSTMAN 出來的code
# 之後改pg(page)
url = "https://www.104woo.com.tw/Search/Index?1=1&pg=1&ps=100&sc=4,0"
payload = {}
headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': '_ga=GA1.1.196998217.1648990369; powernpbo0=%AE%E7%A6%CB%AD%5D%B0%CF%B7s%A6%CB; check0=%A1%B443309; select00=11112012%2F07; price0=1041110506029%A1i1%2E0%A1j%A1%B3%A1%B3%A1%B3%A1%B3%2F%A1%B3%A1%B3%2F%A1%B3%A1%B3%A1%E3%A1%B3%A1%B3%A1%B3%A1%B3%2F%A1%B3%A1%B3%2F%A1%B3%A1%B3%A1%B3%A1%B3%A1%B3%A1%B4%B7s%A6%CB%2E%A5x%A4%A4%2E%AE%E7%B6%E9; _fbp=fb.2.1648990368684.1797440529; ASP.NET_SessionId=0kma4qdjxtluyy5hvltqcn3h; ASPSESSIONIDCQQRTSQQ=HJBHCNGBGOEHFKPCFOEJEEMJ; ASPSESSIONIDCUQRTSQQ=NJDICNGBBGFIFCIDEELOIHEJ; __RequestVerificationToken=mvQotFRRY-jmGHZEqsJddSzpq8Y-AWvWCge8TYgSVjF_7bZS_5HUyzuS71HcqrYMEyN4Kz0Bs_9aW1cJY4FZlYl6byeMTH2ktINTjNi5Ioc1; _ga_FEZDZVPB7B=GS1.1.1652330770.28.1.1652330771.0',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
}

response = requests.request("GET", url, headers=headers, data=payload)
# print(response.text) #印成TEXT

# with open('89.html', 'w+', encoding = 'utf-8') as f:
#     f.write(response.text)  #印成HTML查看印出樣子


# 給他資料，並告訴他這是html，這是網頁的整個資料
Soup = bs4.BeautifulSoup(response.text, "html.parser")
# print(root.input) # 抓標籤再來抓到底下的文字

# label=Soup.find("label",class_="ck_container") # BeautifulSoup給的工具: 尋找 Class="ck_container" 的 label標籤
# ids=Soup.find("input",class_="objCheck")
# print(ids)
for x in Soup.find_all('input'):  # 網頁的整個資料 找到input標籤
    # print(x.get('ids')) #得到搜尋網址中的 ids 有我要的搜尋網址參數  eg:SCD_51829
    ids = x.get('ids')
    print(ids)
    if x.get('ids') != None:  # 如果有ids資料就拆參數
        # print(type(x.get('ids')))
        # print(x.get('ids').split("_"))  #得到搜尋網址中的 c & no 拆開
        # bs4 官網 https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/
        print(x.get('ids').split("_")[0])  # 得到搜尋網址中的 參數 c
        arg_c = x.get('ids').split("_")[0]
        print(x.get('ids').split("_")[1])  # 得到搜尋網址中的 參數 no
        arg_no = x.get('ids').split("_")[1]


# 先看看單一個的等等回來處理迴圈
# detail_url = "https://www.104woo.com.tw/Detail/Index?c="+arg_c+"&no="+arg_no   #將上面得到的參數 c & no 放到Detail網址列
# detail_response = requests.request("GET", detail_url, headers=headers, data=payload)
# # print(detail_response.text) #印成TEXT
# with open(str('Detail'+'.html'), 'w+', encoding = 'utf-8') as f:
#     f.write(detail_response.text)  #印成HTML查看印出樣子


#TEST @單一個的
detail_url = "https://www.104woo.com.tw/Detail/Index?c=KSD&no=285400"  # TEST
detail_response = requests.request(
    "GET", detail_url, headers=headers, data=payload)
# print(detail_response.text) #印成TEXT
# with open(str('Detail2854001'+'.html'), 'w+', encoding='utf-8') as f:
#     f.write(detail_response.text)  # 印成HTML查看印出樣子

# 內容都在 div class="container-fluid-detail fade-in"
detail_Soup = bs4.BeautifulSoup(detail_response.text, "html.parser")

# 表頭
section_top = detail_Soup.find(
    "div", class_="row align-items-end section-custom section-top")
# print(section_top)
# .contents[0] 表示子節點 / .string 內容string /.get("")標籤屬性

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

# print("section_top_right.contents[10]",section_top_right.contents[10])
print("section_top_right.contents[11]",
      section_top_right.contents[11].string)  # 主建物
main_building = section_top_right.contents[11].string
# print("section_top_right.contents[12]",section_top_right.contents[12])
print("section_top_right.contents[13]",
      section_top_right.contents[13].contents[0])  # 總坪數
total_area = section_top_right.contents[13].contents[0]

# print("section_top_right.contents[14]",section_top_right.contents[14])
# print("section_top_right.contents[lenght]",section_top_right.contents )

# 表頭左邊
section_top_left = detail_Soup.find(
    "div", class_="col-lg-8 order-lg-1")
# for i in range(1, 15):
#     print("section_top_left.contents["+str(i)+"]",section_top_left.contents[i])
print("section_top_left.contents[1]",
      section_top_left.contents[1].contents[0].strip())  # 法院
court = section_top_left.contents[1].contents[0].strip()

print("section_top_left.contents[1]",
      section_top_left.contents[1].contents[5].contents[1].string)  # 人氣數量
popular = section_top_left.contents[1].contents[5].contents[1].string

# 地址 高雄市新興區林森一路252號14樓<14>
print("section_top_left.contents[3]", section_top_left.contents[3].contents[1])
address = section_top_left.contents[3].contents[1]

print("section_top_left.contents[5]", section_top_left.contents[5].get(
    "value"))  # thisId 110逸116965
thisId = section_top_left.contents[5].get("value")

print("section_top_left.contents[7]",
      section_top_left.contents[7].get("value"))  # 網址 c
url_c=section_top_left.contents[7].get("value")

print("section_top_left.contents[9]", section_top_left.contents[9].get(
    "value"))  # city 高雄市
city=section_top_left.contents[9].get("value")

print("section_top_left.contents[11]",
      section_top_left.contents[11].get("value"))  # 網址 no
url_no=section_top_left.contents[11].get("value")

# 第幾拍
times = detail_Soup.find(
    "font", class_="font-link-red").string
print("times", times)

# 投標日期
date_th = detail_Soup.find(
    "span", attrs={"data-th": "投標日期"}).string
print("date_th", date_th)

# 投標時間
time_th = detail_Soup.find(
    "span", attrs={"data-th": "投標時間"}).string
print("time_th", time_th)

# 建坪
building_area = detail_Soup.find(
    "font", attrs={"title": "推算公設坪數"}).string
print("building_area", building_area)

# 地坪
lend_area = detail_Soup.find(
    "span", attrs={"data-th": "地坪"}).contents[0]
print("lend_area", lend_area)

# 類建蔽率
building_ratio = detail_Soup.find(
    "a", attrs={"title": "類建蔽率"}).contents[0].string
print("building_ratio", building_ratio)

# 房屋單價
house_per_price = detail_Soup.find(
    "span", attrs={"data-th": "房屋單價"}).contents[0].strip()
print("house_per_price", house_per_price)

# 總底價
house_total_lowprice = ' '.join(detail_Soup.find(
    "span", attrs={"data-th": "總底價"}).string.strip().split())
print("house_total_lowprice", house_total_lowprice)

# 實價交易
real_price = detail_Soup.find(
    "font", attrs={"title": "實價交易歷史記錄"}).string.strip()
print("real_price", real_price)

# 保證金
caution_money = detail_Soup.find(
    "span", attrs={"data-th": "保證金"}).contents[0].strip()
print("caution_money", caution_money)

# 開標結果
result_price = detail_Soup.find(
    "span", attrs={"data-th": "開標結果"}).contents[0]
print("result_price", result_price)

# 公告現值 元/㎡
open_price = detail_Soup.find(
    "span", attrs={"data-th": "公告現值"}).contents[0].strip()
print("open_price", open_price)

# 拍後增值
after_result_price = detail_Soup.find(
    "span", attrs={"data-th": "拍後增值"}).contents[0]
print("after_result_price", after_result_price)

# 屋齡
house_years = detail_Soup.find(
    "span", attrs={"data-th": "屋齡"}).contents[0].strip()
print("house_years", house_years)

# 社區名稱
community_name = detail_Soup.find(
    "span", attrs={"data-th": "社區名稱"}).contents[0].strip()
print("community_name", community_name)

# 土地     https://iter01.com/60617.html 取得子節點的字串
contentLand = detail_Soup.find(
    "div", attrs={"id": "contentLand"}).stripped_strings  # stripped_strings 去掉空白
# print("contentLand", contentLand1)
contentLand2 = ""
for x in contentLand:
    # print( x.strip())
    contentLand2 = str(contentLand2)+x.strip()  # strip去掉空白
print(contentLand2)

# 建物
contentCase = detail_Soup.find(
    "div", attrs={"id": "contentCase"}).stripped_strings
# print("contentCase",contentCase)
contentCase2 = ""
for x in contentCase:
    contentCase2 = str(contentCase2)+x.strip()
print(contentCase2)

# 查封筆錄
contentRecord = detail_Soup.find(
    "div", attrs={"id": "contentRecord"}).stripped_strings
# print("contentCase",contentCase)
contentRecord2 = ""
for x in contentRecord:
    contentRecord2 = str(contentRecord2)+x.strip()
print(contentRecord2)

# 得標人查詢
winner = detail_Soup.find(
    "a", attrs={"title": "得標人查詢"}).contents[0].string
print("winner", winner)

# 拍賣紀錄
record = detail_Soup.find(
    "td", attrs={"class": "record"}).stripped_strings
# print("record", record)
record2 = ""
for x in record:
    record2 = str(record2)+x.strip()
print(record2)


# 謄本資料????????????????????????????????? 有空再取得

# 土地漲價總額
increase = detail_Soup.find(
    "td", attrs={"class": "increase"}).stripped_strings
# print("record", record)
increase2 = ""
for x in increase:
    increase2 = str(increase2)+x.strip()
print("increase2", increase2)


# 社區資料 使用執照
license = detail_Soup.find(
    "a", attrs={"title": "使用執照"}).contents[0].string
print("license", license)


# 實價預估投報率????????????????????????????????? 有空再取得


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
print(img_list)


doc = {
    # 'arg_c': arg_c,
    # 'arg_no': arg_no,
    "public_build_ratio":public_build_ratio,
    "main_building":main_building,
    "total_area":total_area,
    "court":court,
    "popular":popular,
    "address":address,
    "thisId":thisId,
    "url_c":url_c,
    "city":city,
    "url_no":url_no,
    "times":times,
    "date_th":date_th,
    "time_th":time_th,
    "building_area":building_area,
    "lend_area":lend_area,
    "building_ratio":building_ratio,
    "house_per_price":house_per_price,
    "house_total_lowprice":house_total_lowprice,
    "real_price":real_price,
    "caution_money":caution_money,
    "result_price":result_price,
    "open_price":open_price,
    "after_result_price":after_result_price,
    "house_years":house_years,
    "community_name":community_name,
    "contentLand":contentLand2,
    "contentCase":contentCase2,
    "contentRecord":contentRecord2,
    "winner":winner,
    "record":record2,
    "increase":increase2,
    "license":license,
    "img_list":img_list,

}
doc_ref = db.collection("85soez").document("test")
doc_ref.set(doc)
