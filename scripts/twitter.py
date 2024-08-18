import tweepy
import requests
from PIL import Image
from io import BytesIO

# Twitter API credentials
api_key = "Pj9oV6WotHPG5BgZqHxZWsYkx"
api_secret_key = "g9vFQNb0xUkzsE6Zp9gR69eQ371F49tRZH2dwtUp7K2Ck1GwYm"
access_token = "925322607120998400-4WKanqQoP1CCWlBb2cXBKr2Cwj5QQWw"
access_token_secret = "Tpv10Zz2075E02ZVdayYH7o8dQM1ALsvn5d0ssUEkx5hk"

# Authenticate to Twitter
auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# Function to check if an image is landscape
def is_landscape(image_url):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    width, height = img.size
    return width > height

# Function to get landscape image URLs from the user's tweets
def get_landscape_images(username):
    tweets = api.user_timeline(screen_name=username, count=100, tweet_mode='extended', include_rts=False)
    landscape_images = []

    for tweet in tweets:
        media = tweet.entities.get('media', [])
        for m in media:
            image_url = m['media_url_https']
            if is_landscape(image_url):
                landscape_images.append(image_url)

    return landscape_images

# Get landscape image URLs from @BigMarcel24's timeline
landscape_images = get_landscape_images("BigMarcel24")
print("Landscape images found:", len(landscape_images))
for url in landscape_images:
    print(url)
