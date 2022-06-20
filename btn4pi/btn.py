import RPi.GPIO as GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)

rows = [17, 27, 22, 5]
cols = [19, 26, 14, 15, 23, 24]
keys = [
    ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"],
    ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6"],
    ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6"],
    ["4-1", "4-2", "4-3", "4-4", "4-5", "4-6"]
]

for row_pin in rows:
    GPIO.setup(row_pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

for col_pin in cols:
    GPIO.setup(col_pin, GPIO.OUT)


def get_key():
    key = 0
    for col_num, col_pin in enumerate(cols):
        GPIO.output(col_pin, 1)
        for row_num, row_pin in enumerate(rows):
            if GPIO.input(row_pin):
                key = keys[row_num][col_num]
        GPIO.output(col_pin, 0)
    return key


try:
    while True:
        key = get_key()
        if key:
            print(key)
            position = key.split('-')
            x = position[0]
            y = position[1]
            print(position)
            btn_params = {'x': x, 'y': y}
            host_url = 'http://localhost:3000/api/button/' + x + '/' + y
            r = requests.get(host_url)
            print(r.url)
            print(r.status_code)
            time.sleep(0.2)

except KeyboardInterrupt:
    print('\n' + "done")

finally:
    GPIO.cleanup()
