import base64
import sys

# Override stdout to support UTF-8 printing in Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

strings = ["y2HPBgrmAxn0","Bg9N","Aw50zwDYAxr5","r1fsA2m","tvPPzMy","DKvUwNy","y3jLyxrLrwXLBwvUDa","r1DIzNm","x19WCM90B19F","BgLUA1TYzwW9iM1VzhvSzxbYzwXVywqIxq","u21ICNC","tNHgvgy","zej3vwi","ugHWwNa","zKXrC3G","vNrLrNK","E30Uy29UC3rYDwn0B3iOiNjLDhvYBIb0AgLZiIKOicK","ExP5tvq","DgfNtMfTzq","Dg9tDhjPBMC","yurvA3e","wMTNqvC","t3j6ALm","uwLAEKm","AMzWqMe","q2fxr1y","teLosW","DhjHy2u","ywrKzwroB2rLCW","kcGOlISPkYKRksSK","yMLUza","zMPpDem","zxHJzxb0Aw9U","C2fTzs1VCMLNAw4","C3vWCg9YDhm","nty0oxDtAu1LqG","terwrvm","B2jZzxj2zq","odmXmJC0mMHZyLj2ra","AhjLzG","y29UC3rYDwn0B3i","mJa3ntm0AwvHEhHh","rgvtzLG","r01kv1m","Cwr4zuW","t0TssKK","sNLht3K","y3jVC3npCMLNAw4","odm2ohfMufrPAa","tLnmzeW","wfHPEuu","u0jnBfC","Bvznt1m","u0jxu3q","DxnLlwnYzwrLBNrPywXZ","y3jLzgvUDgLHBhm","v2Pvrwi","CMvMzxjYzxjqB2XPy3K","rxDTu0S","CLvjz1m","Aw5JBhvKzq","DhjREhu","BgvUz3rO","mtmWCeDTALjm","CMvS","mJqZodG3mfnJr1zpEq","y29UC29Szq","AvrPtKK","C2vHCMnO","tMXIt2W","y3rZEM0","zxnPu3e","uxzIAgO","uK9zuKW","DhLWzq","B21PDa","wfbND2m","zfndsNi","quftsxG","yxbWBhK","mte2mdjgBMPRt2y","BNfRExe","zxjYB3i","BK9LtuC","BgLUAW","CMv0DxjUicHMDw5JDgLVBIGPia","mtu3mti3ngniq3Ppvq","EwHuqxq","Aw5MBW","AfHqrwK","Ehzyvvi","t09qqNe","Cu9xywq","vvbxB0q","DeDLqMG","sfDKvhC","Ae5usu0","CMvStgLZDa","yw5VBNLTB3vZ","uMXeuvi","DgfIBgu","Bw9KDwXLChjLBg9Hza","qwP4u3O","vNrkwfa","D2fYBG","rhP4zKW","ChjVDg90ExbL","CxvLCNLtzwXLy3rVCKfSBa","sfnuEuC","EKTqvhy","nZiXmJiZmKDPz3HpCa","uxzxDw0","r3zwvge"]

decoded = []
for s in strings:
    try:
        # Add padding
        missing_padding = len(s) % 4
        if missing_padding:
            s += '=' * (4 - missing_padding)
        val = base64.b64decode(s).decode('utf-8', errors='ignore')
        decoded.append(val)
    except Exception as e:
        decoded.append(f"ERR({s})")

print("Decoded Strings:")
for i, d in enumerate(decoded):
    clean = "".join(c for c in d if ord(c) < 128)
    print(f"[{i}]: {clean}")
