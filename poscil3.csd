<CsoundSynthesizer>
<CsOptions>
; Select audio/midi flags here according to platform
-odac     ;;;realtime audio out
;-iadc    ;;;uncomment -iadc if real audio input is needed too
; For Non-realtime ouput leave only the line below:
; -o poscil3.wav -W ;;; for file output any platform
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs  = 1

giSine ftgen 0, 0, 2^10, 10, 1

instr 1

  kamp init .5
  kfreq init 440
  kpanpos init 0.5

  kamp_channel chnget "amp"
  if kamp_channel != 0 then
    kamp = kamp_channel
  endif

  kfreq_channel chnget "freq"
  if kfreq_channel != 0 then
    kfreq = kfreq_channel
  endif

  kpanpos_channel chnget "panpos"
  if kpanpos_channel != 0 then
    kpanpos = kpanpos_channel
  endif
  
  
asig   poscil3 kamp,kfreq, giSine

aL,aR pan2    asig, kpanpos	; sent across image
      outs    aL, aR
endin

schedule 1, 0, -1

</CsInstruments>
<CsScore>

</CsScore>
</CsoundSynthesizer>