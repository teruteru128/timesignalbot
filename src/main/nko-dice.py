import random
FACES = ['ま', 'ん', 'こ', 'ち', 'う', 'お']
for y in range(10000):
    for x in range(5):
        print(random.choice(FACES), end='')
    print()
