import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.common.exceptions import ElementClickInterceptedException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# 검색어 리스트
json_list = [
    # "수원역 맛집",
    # "신사역 맛집"
    "홍대입구역 맛집",
    # "수원시청역 맛집",
    # "부평역 맛집",
    # "강남역 맛집",
    # "구월동 맛집"
]

# WebDriver 경로 설정
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


wait = WebDriverWait(driver, 300)

total=[]
# 시작 URL
start_url = 'https://www.google.co.kr/maps/search/'

# 검색어별로 반복
for keyword in json_list:
    # 결과를 저장할 리스트
    results = []

    # 검색어를 URL에 포함시켜 검색 페이지로 이동
    search_url = f'{start_url}{keyword.replace(" ", "+")}'
    driver.get(search_url)
    
    time.sleep(20)  # 페이지 로드 대기

    try:
      scrollable_div = driver.find_element(By.CSS_SELECTOR,"#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd")
      # 스크롤을 내려서 더 많은 결과가 로드되도록 함
    except:
       print(keyword,'에서 타임아웃 발생')
    
    for _ in range(10):  # 스크롤을 10번 내림
      try:
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div)
        time.sleep(15)  # 스크롤 후 잠시 대기
      except:
        break
    
    i,count=3,0
    # 각 카테고리 태그를 출력 또는 저장
    while True:
      skip_to_next = False
      try:
        # 리스트의 각 항목을 클릭
        click_item=WebDriverWait(driver, 300).until(EC.visibility_of_element_located((By.CSS_SELECTOR, f'#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child({i}) > div > a')))
        click_item.click()
        time.sleep(50)  # 상세페이지 로드 대기
      except:
        print(click_item,'에서 타임아웃 발생')
        skip_to_next=True

      if skip_to_next:
        continue

      try:
        # 이미지 요소 찾기
        image_element = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div.ZKCDEc > div.RZ66Rb.FgCUCc > button > img')))

        # 이미지 URL 가져오기
        image_url = image_element.get_attribute('src')

        place = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div.TIHn2 > div > div.lMbq3e > div:nth-child(1) > h1')))
        place_name = place.text

        category = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div:nth-child(2) > span > span > button')))
        category_text=category.text
        
        address = wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@data-item-id="address"]/div/div[2]/div[1]')))
        address_text=address.text
      except:
        print(keyword,i,'사진, 이름, 카테고리, 주소 부분에서 타임아웃 발생')
        skip_to_next=True

      if skip_to_next:
         continue
        

      try:
        # 리뷰 더보기
        more_span=WebDriverWait(driver, 300).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div:nth-child(3) > div > div > button:nth-child(2)')))
        more_span.click()
        time.sleep(20)  # 상세페이지 로드 대기
      except:
        print(keyword,'리뷰 리스트 가져오기에서 타임아웃 발생')
        skip_to_next=True
      
      if skip_to_next:
         continue
        
      try:
        # 리뷰 스크롤
        scroll_div = driver.find_element(By.CSS_SELECTOR,"#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf")
      except:
        print(keyword,'리뷰 스크롤에서 타임아웃 발생')
        skip_to_next=True

      if skip_to_next:
        continue

      # 스크롤을 내려서 더 많은 결과가 로드되도록 함
      for _ in range(10):  # 스크롤을 10번 내림
        try:
          driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scroll_div)
          time.sleep(10)  # 스크롤 후 잠시 대기
        except:
          break
      

      if skip_to_next:
        continue

      try:
        rating=WebDriverWait(driver, 100).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div.PPCwl > div > div.jANrlb > div.fontDisplayLarge'))).text
      except:
        rating=0
        print(keyword,i,'별점에서 타임아웃 발생')

      try:
        review_elements = driver.find_elements(By.CSS_SELECTOR, '.jftiEf.fontBodyMedium')
        time.sleep(50)
        reviews=[]
      except:
        print(keyword,'리뷰 리스트 가져오기에서 타임아웃 발생')
        skip_to_next=True

      if skip_to_next:
         continue


      cnt=0
      for review_element in review_elements:
        # 필요한 추가 정보 추출 로직
        skip2=False
        try:
          more_btn=review_element.find_element(By.CSS_SELECTOR, '.w8nwRe.kyuRq').click()
          time.sleep(10)
        except:
          pass
        
        try:
          review=review_element.find_element(By.CSS_SELECTOR, '.wiI7pd').text
        except:
          skip2=True

        if skip2:
           continue
        
        reviews.append(review)

        cnt+=1 # 20개까지만 수집
        if cnt>=20:
           break
        # 추가 처리 로직


      # 객체 생성
      place_info = {
          'place_name': place_name,
          'category': category_text,
          'address' : address_text,
          'rating': rating,
          'img': image_url,
          'reviews': reviews
      }

      print(place_info)
      results.append(place_info)
      # 뒤로가기
      # driver.back()
      i+=2
      count+=1
      if count==50:
        break
      time.sleep(15)

    # 파일 이름 생성 (특수문자 제거 및 공백을 '_'로 대체)
    filename = keyword.replace(" ", "_").replace("/", "_") + '.json'
    
    total.append(results)
    # 결과를 JSON 파일에 저장
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    

    print(f"Saved results to {filename}")

# 결과 출력
print(json.dumps(results, ensure_ascii=False, indent=2))
# 결과를 JSON 파일에 저장
with open('total_results.json', 'w', encoding='utf-8') as f:
    json.dump(total, f, ensure_ascii=False, indent=2)

# 드라이버 종료
driver.quit()
