<template>
  <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
  <div
    class="relative overflow-x-hidden w-full flex flex-col bg-transparent text-white items-center font-['joystix'] z-10">
    <!-- nav -->
    <div class="transition-all relative md:fixed top-0 left-0 w-full text-center text-white z-10" v-bind:class="{
      'py-2 md:py-4 bg-black/30': scrollPos >= 40,
      'py-6 md:py-12': scrollPos < 40,
    }">

      <div class="inline-flex justify-center gap-2 mt-2 md:mt-4 brightness-200">
        <a class="hover:opacity-50 transition-all" href="https://twitter.com/tamagogi_dapp" target="_blank"><img
            class="w-8 md:w-10" src="@/assets/icon/twitter.svg" alt="" srcset=""></a>
        <a class="hover:opacity-50 transition-all" href="https://opensea.io/collection/potted-potted"
          target="_blank"><img class="w-8 md:w-10" src="@/assets/icon/opensea.svg" alt="" srcset=""></a>
        <a class="hover:opacity-50 transition-all" href="https://discord.gg/MjcceahkVk" target="_blank"><img
            class="w-8 md:w-10" src="@/assets/icon/discord.svg" alt="" srcset=""></a>
        <a class="hover:opacity-50 transition-all"
          href="https://etherscan.io/address/0x81b491EA8c26AffFE00Dd27517Dcd838Bf5097BE" target="_blank"><img
            class="w-8 md:w-10" src="@/assets/icon/etherscan.svg" alt="" srcset=""></a>
        <a class="hover:opacity-50 transition-all" href="https://medium.com/@tamagogi.app" target="_blank"><img
            class="w-8 md:w-10" src="@/assets/icon/medium.svg" alt="" srcset=""></a>
      </div>
      <div class="mt-2 flex items-center justify-center gap-4 text-xs">
        <div class="link-btn" @click="scrollTo('mint')">mint</div>
        <router-link to="/my-potteds" class="link-btn">My potteds</router-link>
      </div>
    </div>

    <!-- intro -->
    <div class="relative flex w-full md:h-screen items-center justify-center flex-col px-10 text-justify">
      <div class="md:w-48 2xl:w-64 intro-potted cursor-pointer" ref="introPottedRef" @click="fetchIntroPotted()">
      </div>
      <div class="font-['MK'] text-2xl md:text-5xl text-yellow-300">
        potted－potted</div>
      <div class="text-sm text-yellow-300">
        Fully onchain potted artwork, powered by <a class="hover:opacity-75 underline"
          href="https://twitter.com/tamagogi_dapp" target="_blank">TAMAGOGI</a>
      </div>
      <div
        class="mt-8 text-xs md:text-md text-center bg-black/40 text-white backdrop-blur p-4 md:py-4 md:px-16 rounded-xl md:rounded-xl leading-normal">
        Japanese-style bonsai has its charm, whether the type of pot, <br />the direction of growth of
        the branches or whether flowering or not, there are multiple set of styles.<br /><br />

        <span class="underline font-bold">POTTED-POTTED</span> is The first on-chain generated Potted artwork.
      </div>
      <div v-if="store.state.nftConfig.phase <= 1" class="bg-green-600 text-white rounded px-4 py-2 mt-8">allowlist
        Raffle of Phase 2 is now opening, <span class="underline cursor-pointer" @click="scrollTo('raffle')">Go
          register</span></div>
      <div class="scroll-down">
        <div></div>
        <p>features</p>
      </div>
    </div>

    <!-- features -->
    <div class="flex w-full md:min-h-screen items-center justify-center flex-col p-10">
      <div class="title" data-aos="fade-up">
        Features
      </div>
      <div class="content leading-loose">
        1. Images stored on contract instead of ipfs.<br />
        2. Art generated onchain.<br />
        3. Reveal by owners not team.<br />
        4. Owners will able to export art with transparent background <br />of customize scale from dashboard.<br />
        5. ... more
      </div>
      <img data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200" class="w-48" src="@/assets/preview/1.svg"
        alt="" srcset="">
    </div>

    <!-- art -->
    <div class="flex w-full md:min-h-screen items-center justify-center flex-col p-10">
      <div class="title" data-aos="fade-up">
        Art
      </div>
      <div class="content leading-loose flex flex-col items-center">
        <div class="flex flex-col md:flex-row items-center md:items-end justify-center text-center gap-8">
          <div>
            <img src="@/assets/traits/1.png" alt="" srcset="">
            <p class="mt-4">background</p>
          </div>
          <div>+</div>
          <div>
            <img src="@/assets/traits/3.png" alt="" srcset="">
            <p class="mt-4">potted</p>
          </div>
          <div>+</div>
          <div>
            <img src="@/assets/traits/2.png" alt="" srcset="">
            <p class="mt-4">branch</p>
          </div>
          <div>+</div>
          <div>
            <img src="@/assets/traits/4.png" alt="" srcset="">
            <p class="mt-4">blossom</p>
          </div>
          <div>=</div>
          <div>
            <img src="@/assets/traits/5.png" alt="" srcset="">
          </div>
        </div>
        <div class="text-center text-3xl mt-20 mb-12 text-yellow-300">
          Traits
        </div>
        <div class="inline-block">
          <p class="mb text-yellow-300">background: x 5</p>
          <p class="mb-8 underline">2 rare + 3 normal.</p>
          <p class="mb text-yellow-300">potted: x 22</p>
          <p class="mb-8 underline">All unique pots.</p>
          <p class="mb text-yellow-300">branches: x 24</p>
          <p class="mb-8 underline ">there are 3 correspond to specific blossom.<br />each branch contains 3 to 14
            flowering points, and may not bloom,<br /> may have multiple flowers overlapping.</p>
          <p class="mb text-yellow-300">blossom: x 25</p>
          <p class="mb-8 underline ">Each contains 3 to 7 different variations.</p>
          <p class="text-md text-center mt-16">Over 10,000,000,000 combinations !</p>
        </div>
      </div>
      <img data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200" class="w-48" src="@/assets/preview/2.svg"
        alt="" srcset="">
    </div>

    <!-- mint -->
    <div class="flex w-full md:min-h-screen items-center justify-center flex-col p-10" id="mint">
      <div class="title" data-aos="fade-up">
        MINT
      </div>
      <div class="content leading-loose flex flex-col">
        <!-- info -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
          <img class="w-32 rounded"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjQgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iNjQiIGhlaWdodD0iOTYiIGltYWdlLXJlbmRlcmluZz0icGl4ZWxhdGVkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQmdDQVlBQUFDdHhYVG9BQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFBWUZKUkVGVWVGN3RtN0VSd2pBTVJaTWRXSUdoV0l6Tm1DRWxQUlJ3dVNOM0tTZ2N4NUsrN0VjUGlaNmwvMGg4bnQrdjUyY2ErRE1EZ0E1Z0JNaUFnVE53SWdTSHQ4RHl1QmRud09WNjYyNWE1aU1BOXRYM0FxTWFRQzh3bWdCWVlXVHRpR1lBdG83SUJxSTVnR3pkWUFJZ0V3UXpBRmtnbUFMSUFNRWNnRG9FRndES0VOd0FxRUlBUU8yelFPMVRrZG9mSmRjT1VCd0Rkd0JxRUFEZ25RRjB3Qzg5VmNJd1pBU1V1Z0FBRVJsQUJ3aTlRbU1FR0lFREd5TzEvLy8vZlE4Tml1d3lrUUZrQUJsUXZqdE1DRFlrZ0FWR3RvREs2cThOSGFKQkFJaTBmMGdIS0swK0FMd3pRRzMxWFR0QXNYZ0FlSTJBNnVxN2RJQnk4ZVlBMUlzM0JaQ2hlRE1BV1lvM0FaQ3ArS1lBc2hXK3ZkbzQvVFNZdGZEVEFMSVhYZ1dnbDZMM2IvWTRORFg4b1NrQWNIYVlzOFBGNXdZYjdvdkkvQlFXSUFRSlFVS1FFSlNKNUlBYndRSllBQXRnQVN3UUVMNHlsOFFDV0FBTFlBRXNJQlBKQVRlQ0JiQUFGc0FDV0NBZ2ZHVXVpUVd3QUJiQUFsaEFKcElEYm1SNEMzd0I5ZUoxa0lYVEJITUFBQUFBU1VWT1JLNUNZSUk9Ii8+PGltYWdlIHg9IjE3IiB5PSI1OCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjI5IiBpbWFnZS1yZW5kZXJpbmc9InBpeGVsYXRlZCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCd0FBQUFkQ0FZQUFBQzVVUXd4QUFBQUJITkNTVlFJQ0FnSWZBaGtpQUFBQlBOSlJFRlVTRXU5Vmt0UEcxY1Uvand6Zmo5eG9HMGlBb0Yya2E3YVZRa2g0UldJZUVocHE2cnRxc29QaWJyTWY2blVmUmRwMUxSSVdRUVM4cklCSTJoaXB6UUVtNGVOM3g3UDlIN1hHc2RqWTlKRjA3TVp6L2pjODUzdlBLOEQvNFBjWGhnd2IvMlNjaERLY1d0MndPU1AyNzgyUG53ei9wbFpyOWVocWlxcXRScFVSWUhUNVJMdjJqdGRxMVVyNEZtS1lScHdhazVjZEI5aTIvd0lQOTFkYmdCYVZuNmNHelpWeFVDOEZJVXVnQUFUbFhJRkxyZGJndlBncHQ0cmdWc05PeHdPbUthSno4TjV4SXRSQ1Rqb3F5QlpkQ09zbHREdjBiRlJpVWlZbisrdENtMGgxMlpuelQ0ekt3MWRjQjNEcGFuWUxQcFFxcFR4U1VTQjM2R0xkeThVUllOaDFOR3ZacEdzQm1EVVRkUU5IWW93NHcrRzhJRjZMQTIvekNxb200eVNBazExUWhYMktHbEVHZ3puRnhmTmNybU1RT2x2cUE0Vm53WXJLSmdha2dVQklOZ2FnZ0hvbTNnNm5VNzB1UTFvWmdXN05aOXdRaGdYckFqdTlycHgxbFZDS3E4S1J3emhuQ0h0S2FvRHg3Nno4bDBDZnZuVjEyYXBYRUpOR0kvV01pZ2JDb2E5SmZ4VmNvcHZWUWxDdzhVNlBWWmtGRlFSOHFCbXlIQVpBckJXMVNVZ1F6NmtpZkNMQ0ZGTXpZT3NHcEpwOFhxOGJ3RmRvakNxMVNyNHRPUmliZ1V2UDd5S2Nxa01qOWNqbjlRSmhVTlM1ZVAwSDlqdW03QVZrNlZqMmJGczh0a3NtbSsvKzk2a3dmY3R1V3l1d2JBVmNIeDhYRmJuZytVSE52eVJMMGJrKzliV0Z2WVA5cHYvV2QrNzZhK3ZyeUYzM0NpbUpzTWZidDZVdlVpWnVUYURZNkd3dTd1TFpDcjVydzIzNjlPT1h0Zng0czhYTmp1U1lTdmczTndjRGc4T2NYUjBoTVJtd2diSXhDY1NDUnZEU3lPWE1IaGhFRThlUDdIcHo4L1BpOEoySUpQT1lIbGx1VHZEeGNWRnFWUXNGdkU4OXJ5cHlGRDM5UFJJdzYzTXg4YkdFQTZIc2IyMWJRTWtROVpGTHBmRDB0SlNkOEFiTjI1SWRtOTIzOWdNa0RtZFNMNU0yZ0N2WHJrS2o4ZURWQ3BsMDZlRExxZExwaVlXajUwT3lFYU9QWS9aREJPUUkyeGpmY1AyL2ZMb1pkbGplM3Q3TmtBeTUvZDJCMC9NSVpzOEhvdmJERTlPVHNJdDVtbzc0T2lsVVFSRFFSUUtCZHkvZjcvSmhNejlBVC9XMTlaUEx4b21tN0lXWDdNcHNqZzBUY09yVjY4NkdOS1JiRGFMMWNlclRVQXlqL1JFT2h6dllEZzlQUzJadEFPeTN4aWluWjBkR3lBWjlwL3Z4N09uejJ3aHZUSjJSY3hRNWQwaG5aaVlnTmZyN1FnRlExcXRWRThFSEJvZXdxT0hqem9BT1FMYlU5UEJrSUJHM1pCVjExcitDd3NMNEdocUR5a1pVZzRPRGpxcTFPLzNZeit6ZjNvZkVwQmwzbDRjN0U5ZEY4dTByVW9aNmxBb2hHS3BhQ3NhMmdrR2c5aDdzOWNFNUdEdm1LV01mZlJNRkltTlJFY2p1ejN1am5hWm1weUMxK2VWUmROYXBRU2tJK3huYTlKa01wbTNDN2kzdDFlR2h2MXo3dHc1eWFSMTB0QUFHM2x6YzlNVzZtNE9NdWVhMkkydGpYOGlvRFg5NitJUzlIQmx4ZFpYZkduUExjdi8vTUQ1amxuS1NST0pSUEQweVZQcElQUFBKZC9jK05aUzdRYklQdVNrNmJaRjJvYzltVFBucjErL2xvRE1YemFYYlFCT1RFNlpBNE1Ea2syM3ZYY21lZ2FCUUFENWZONjJMZmpka3BQMkpGTndlSFFvQWZsL0U5RG45OEhLWTlQQ2YvVERDbWZ6RWtXN2sxUFRKblB4UG9UczB1azBmci8zVytOZVNwbTVmdDNVYTdyY2JSVG1sSXI1UWg0QmYwRHVOZ3E5NVFWSjdqcnhtMUlWTnp2cnRzNUt0czd5NHNUejhyb294dUxkTzNmZUF2TGc5TXlNeVNsRDBaeTg5QnFvNitKQ0t5NnkzQ0R0UWdjdFlVRlJ1T1Y1MWhMYTRGbUM4ZHMvUWR3aXZjbHhpb2dBQUFBQVNVVk9SSzVDWUlJPSIvPjxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iNjQiIGhlaWdodD0iOTYiIGltYWdlLXJlbmRlcmluZz0icGl4ZWxhdGVkIiB4bGluazpocmVmPSJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EZGhRQUJnQUtJQUFBQUFBTjNkM2Q3ZTN0L2YzLy8vL3dBQUFBQUFBQUFBQUNIL0MwNUZWRk5EUVZCRk1pNHdBd0VBQUFBaCtRUUpEZ0FGQUN3QUFBQUFRQUJnQUFBRC8xaTYzUDR3eWttcnZUanJ6YnYvWUNpT1pHbGl3Nm11YkxzUk1CUzdGanlrRFV6UWxVN2dEQnV2OXdOT2pFT1k0R2E1SVYwNjV1WFo4a21IR1pzek44TkNsbGVmMkZzVCs4Z1Q4eGd0VTFzVmd5amJyUU1QQkc4eVhldTBVcXR1ZGt0aWQzOGZoZ1Z4Zms0M1psdGVONEpPZzQ1WExveVlqRzZNbDRXUms2QnFrMUNMbVp1WWdJU2ZrYWVGQzRnZWRKbXpuQ3d4c3F1ZXVnSXFlNVcwbVNlK2pwSzVkaVhEdjMycXRTTEp6SGlpeGlIUFVacXRzeCtpZ2FGN29KK3h2clBQeTJjZHc2dlZQNVErdkIySzJQRG81WGtialZIRmhjbWVteDd3NDBYb1Nidm55RU0rTUh6WXRZcFcwQjh0WnQ2dXFRSWg2UlREZHBOT2ljQTBrSE5nUUltRW5QR3BkUERiTGt2YUlnSmIyWXphUXBNbHdaVWd5TEptbkpZalRocURtVkhKSXhNMStkaEVTVUtuUGdJeFQ3SVl5cFJHMHFld1pqTE5SbWFuVlZkc1dMSTVJbWlyMTY5Z3c0b2RTN2FzMmJObzA2cGR5N2F0MjdkdzQ4cWRTN2V1M2J0NDgrcmR5N2V2MzcrQU95UUFBQ0g1QkFrT0FBVUFMQUFBQUFCQUFHQUFnZ0FBQU4zZDNkN2UzdC9mMy8vLy93QUFBQUFBQUFBQUFBUC9XTHJjL2pES1NhdTlPT3ZOdS85Z0tJNWthWjZvUmF3cHVSTHRTQXdRSEl2dmpldDh6L2FlSDNEem9nMkpBK01SWjF0aWlvelhLdG1pVXFaS2FWRnBza3F3QzYzVXUweDZ4VnRuQkExdWlia085b3g4UXRQRGIvTUN6c3p6QzFwbWVpbHliUXhKVzRKdWhZT0hnb3FFakkwS2o1Q1JiSStPbFg4bGtvMmJreTVZY29KK2xxS0pwb2gycHpLQm9LV2tyU0Nzc0FPRmMyWmF0TFdidUxtM3IwR1lvTGlQZHNPOXVyK3JtQjdCcXMyU3Nwd1YwcmEvd0xYUHZsakxudEpqSUxHSjVOSE9IOURuWThYb0crYkt0dUdCSE1mZzhzYlZFb2pmeEt1d2t1cDVBMWR1b0xkS0hBcjZVL2RLbnI0ckJxTmRjM2duUTZxRDJERENDcUd4VnBzOWJadGNVZXdZQ3lFSmlzRlFWanpaam1USUdORElxWHpvQ3RoTW1sVm1xdGxEY1dlRG5qNTVnZ29Ld1NUUm8waVRLbDNLdEtuVHAxQ2pTcDFLdGFyVnExaXphdDNLdGF2WHIyRERpaDFMdHF4WnFBa0FBQ0g1QkFrT0FBVUFMQUFBQUFCQUFHQUFnZ0FBQU4zZDNkN2UzdC9mMy8vLy93QUFBQUFBQUFBQUFBUC9XTHJjL2pES1NhdTlPT3ZOdS85Z0tJNGtGNVRvTXF4cEZ3eVEwSFlFUE4vNFJ1eDUrQkk5ME1vV0xCb3Z2QWxSdExUc2FrZmRyaGwxbnFvaEtCWXozU0s3M2dwNCt3eFBucy9CMWV4QW82bG05M3RkaEMva2FYdEYvMzNLOEZNQ1MyNDNlQ3VBTlVORGJrTW9pSWx5S3krSGtaTWtqNG1LbWdPSWkyVWdtQytDb21vRGdwMENjcUNQbTV1ZG5Lb2VySkpEazZXZEFYaDBHcSt0bXErR0g2bU1vNmFseFppbWVESWVzRk9Va1o2RzBubEN0TW1TZ0xXVlRORGFpb3pVZVh3WXlwZ0VwT25HdVhLaUl1Zmp2cjN2OEZPMnR2UDA5YTNmamZyN3hVNjVDVmdxUzcxNHZoSitjRFlGMnkxMHRTTFNZdEVzM0N4eHp4UzZZRGdLaWxGQWJlcUtOV01JTHBxM041UmFMV1NZeWRBa2t6L2NXQnBwTW1GTmFvcUVkTndSOGxna2d1d0NxYkVHTGVGSm81dEUzTnMyVVUwNFd3VWtEaVhoS2xOSnEvNks3SVFJZEoyeEtFaVJSbG5hRkYraVhYWENxdHppVlViUEYyd2MrSW9Mb1JiZHUzano2dDNMdDYvZnY0QURDeDVNdUxEaHc0Z1RLMTdNdUxIang1QWpTNTVNdVhLRkJBQWgrUVFKRGdBRkFDd0FBQUFBUUFCZ0FJSUFBQURkM2QzZTN0N2YzOS8vLy84QUFBQUFBQUFBQUFBRC8xaTYzUDR3eWttcnZUanJ6YnYvWUNpT1pHbHlBM0dlZzdDK2NDeGJ3eHdLUTJDRDlRNFRLbDhIS0ZUMExrQ0NycGdCRG81TWhuUFpDRUNqaXVUemlvVWtuVjNKVnh0MmpNZmN5dE96THB6Znp0cDJMR21ENE9kV3J2V1c0Zk5iVDI5cEkzOTVWb0p2VkNlR1g0RXBjR3RiSlkxVGVvWjdYeUtKZjQrTmMyUThrSGg3VHdHZm5HQWFVS0NEajZPa3FRU0VHWHBXT0xkN3VMQ0R1MSs0b3EvQ3NtakVzM1llaUtYTHlxZG55b09JSk1QVXdwR1RJN1pqdTl5NmVMbUxINTdGMWRmWUhtaFdyc3hiem1QTnRCT2ttTld3cnh5VnBOM2d0djM0K2VZQVVTT2lBV0FrZGUvYThWS0ZCRk1uWThjZ0lxTmdjRnVtZ3d1MWhKT0hpcGRjUmkwZkEySElZUWllcVkrejNFV2JPRUZXdlhFQ3paMnpnT05MTGlENytxWHJseFBZeUlFQ1h3cGxPY0ZrS1ZkR2t5bzh1YUZlMEhGRGlhcmgxdzJucnF2T3NQTGNJNjVjUkpoeEhzMVl5aTZWeVIxUmgvblEyaE1yQVJkckI5YnJjckp1MlRJTHFPRjFRRFhIM2dkaS93b2VUTGl3NGNPSUV5dGV6TGl4NDhlUUkwdWVUTG15NWN1WU0ydmV6TG16NTgrZ05TY0FBRHM9Ii8+PC9zdmc+"
            alt="" srcset="">
          <p class="text-md">You will get a unreveal potted with smoke <br />and to reveal it by yourself at phase
            4.<br /><br />The potted and background do not change after revealing.</p>
        </div>
        <!-- connect wallet -->
        <div class="my-8 py-8 text-center ">
          <div class="btn bg-yellow-300 hover:bg-yellow-500 text-black" v-if="store.state.connectedAddress == ''"
            @click="requestAccount()">
            connect wallet
          </div>
          <div v-else>
            connected: {{ store.state.connectedAddress.substring(0,
            5)
            }}...{{ store.state.connectedAddress.substr(store.state.connectedAddress.length - 4) }}
          </div>
        </div>
        <!-- supply -->
        <div class="text-center text-3xl mb-8">
          <number :from="0" :to="store.state.totalSupply" :duration="1" /> /
          <number :from="0" :to="store.state.nftConfig.maxPotted" :duration="1" />
        </div>
        <div class="relative">
          <!-- Phase 1 -->
          <div class="subtitle" :class="{'active': store.state.nftConfig.phase == 1}">
            Phase 1<span>1st collection holders (snapshot)</span>
          </div>
          <div class="bg-black/20 my-12 py-12">
            <div class="flex justify-between" v-if="store.state.nftConfig.phase <= 1">
              <p v-if="checkClaimWLIdx() >= 0" class="alert text-xs bg-green-500 w-auto mx-auto">You are in allowlist,
                you can only mint
                once at phase 1</p>
              <p v-else class="alert text-xs bg-red-500 w-auto mx-auto">You are not in allowlist</p>
            </div>
            <template v-if="store.state.claimed">
              <div class="text-center mt-4 text-xs">You have claimed at phase 1.</div>
            </template>
            <template v-else-if="store.state.nftConfig.phase == 1">
              <div v-if="checkClaimWLIdx() >= 0" class="flex flex-col items-center mt-8">
                <div class="text-center text-xs">You can mint <span
                    class="underline text-yellow-500">{{store.state.petBalance}}</span> potted
                  for
                  free. <br /><br /> <span class="underline">Depends on how many tamagogi pets tokens (prop/pet) you
                    currently hold, <br />you can also buy more now on secondary to mint more.</span></div>
                <div class="btn mt-4 bg-yellow-300 text-black hover:bg-yellow-500" @click="mint('claim')">mint</div>
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase == 0">
              <div class="text-center mt-4 text-xs">Ready to start at {{ new Date(phaseTimestamp[0]).toLocaleString()}}
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase > 1">
              <div class="text-center mt-4 text-xs">END</div>
            </template>
          </div>
          <!-- Phase 2 -->
          <div class="subtitle" :class="{'active': store.state.nftConfig.phase == 2}">
            Phase 2<span>allowlist</span>
          </div>
          <!--raffle-->
          <div id="raffle" class="flex flex-col items-center justify-center mt-8 py-8 p-4 bg-green-400/70"
            v-if="store.state.nftConfig.phase <= 1">
            <div class="py-2 px-6">
              <p class="underline">Allowlist raffle is now opening</p>
            </div>
            <div class="text-sm my-2 text-center">make sure your wallet have 0.02 eth for verify (no cost)<br /> Close
              20 minutes before phase 2 begins.</div>
            <div class="cursor-pointer border py-2 px-4 mt-4 hover:bg-white/50" @click="register()">register</div>
          </div>
          <!--raffle end-->
          <div class="bg-black/20 my-12 py-12">
            <div class="flex justify-between" v-if="store.state.nftConfig.phase <= 2">
              <p v-if="checkAllowlistIdx() >= 0" class="alert text-xs bg-green-500 w-auto mx-auto">You are in allowlist,
                you can only mint
                once
                at phase 2</p>
              <p v-else class="alert text-xs bg-red-500 w-auto mx-auto">Allowlist will announced on discord and twitter</p>
            </div>
            <template v-if="store.state.minted">
              <div class="text-center mt-4 text-xs">You have minted at phase 2.</div>
            </template>
            <template v-else-if="store.state.nftConfig.phase == 2">
              <div v-if="checkAllowlistIdx() >= 0" class="flex flex-col items-center mt-8">
                <div class="text-center text-xs">You can mint <span class="underline text-yellow-500">1</span> potted
                  for
                  free.</div>
                <div class="btn mt-4 bg-yellow-300 text-black hover:bg-yellow-500" @click="mint('presale')">mint</div>
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase <= 1">
              <div class="text-center mt-4 text-xs">Ready to start at {{ new Date(phaseTimestamp[1]).toLocaleString()}}
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase > 2">
              <div class="text-center mt-4 text-xs">END</div>
            </template>
          </div>
          <!-- Phase 3 -->
          <div class="subtitle" :class="{'active': store.state.nftConfig.phase == 3}">
            Phase 3<span>public sale</span>
          </div>
          <div class="bg-black/20 my-12 py-12">
            <template v-if="store.state.publicMinted >= store.state.nftConfig.publicMaxMint">
              <div class="text-center mt-4 text-xs">Exceed max mint.</div>
            </template>
            <template v-else-if="store.state.nftConfig.phase == 3">
              <div class="flex flex-col items-center mt-8">
                <div class="text-center text-xs">You can mint <span class="underline text-yellow-500">1</span> potted
                  for
                  {{(store.state.nftConfig.publicPrice / Math.pow(10, 18))}}
                  eth.</div>
                <div class="btn mt-4 bg-yellow-300 text-black hover:bg-yellow-500" @click="mint('public')">mint</div>
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase <= 2">
              <div class="text-center mt-4 text-xs">Ready to start at {{ new Date(phaseTimestamp[2]).toLocaleString()}}
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase > 3">
              <div class="text-center mt-4 text-xs">END</div>
            </template>
          </div>
          <!-- Phase 4 -->
          <div class="subtitle" :class="{'active': store.state.nftConfig.phase == 4}">
            Phase 4<span>reveal</span>
          </div>
          <div class="bg-black/20 my-12 py-12">
            <template v-if="store.state.nftConfig.phase == 4">
              <div class="flex flex-col items-center mt-8">
                <p class="text-center">Reveal party is now live, <br />join discord and show your potted!</p>
                <router-link to="/my-potteds" class="btn mt-4 bg-yellow-300 text-black hover:bg-yellow-500">reveal my
                  potted</router-link>
              </div>
            </template>
            <template v-else-if="store.state.nftConfig.phase <= 3">
              <div class="text-center mt-4 text-xs">Ready to start at {{ new Date(phaseTimestamp[3]).toLocaleString()}}
              </div>
            </template>
          </div>
        </div>
      </div>
      <img data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200" class="w-48" src="@/assets/preview/3.svg"
        alt="" srcset="">
    </div>

    <!-- token info -->
    <div class="flex w-full md:min-h-screen items-center justify-center flex-col p-10">
      <div class="title" data-aos="fade-up">
        Token INFO
      </div>
      <div class="content leading-loose">
        <div class="token-item">
          <p class="label">Token Standard:</p>
          <p class="value">ethereum - ERC721(A)</p>
        </div>
        <div class="token-item">
          <p class="label">Max Supply:</p>
          <p class="value">{{store.state.nftConfig.maxPotted}}</p>
        </div>
        <div class="token-item">
          <p class="label">Team reserve:</p>
          <p class="value">200</p>
        </div>
        <div class="token-item">
          <p class="label">contract:</p>
          <p class="value max-w-[100px] overflow-clip text-ellipsis">0x81b491EA8c26AffFE00Dd27517Dcd838Bf5097BE</p>
        </div>
      </div>
      <img data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200" class="w-48" src="@/assets/preview/4.svg"
        alt="" srcset="">
    </div>


  </div>
  <div class="bg fixed top-0 left-0 w-full h-full z-0 pointer-none">
  </div>
</template>

<style lang="scss">
.bg {
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: bottom center;
  filter: brightness(.5);
}

.intro-potted {
  svg {
    width: 100% !important;
    height: auto !important;
  }
}

.scroll-down {
  @apply hidden md:block;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  width: 2px;
  height: 5vw;
  background-color: #fff;
  z-index: 5;

  &::before {
    @apply bg-white;
    content: '';
    width: 8px;
    height: 20px;
    border-radius: 2px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 10%;
    animation: scrollDown 3s forwards alternate-reverse infinite ease-in-out;

    @keyframes scrollDown {
      from {
        transform: translate(-50%, 0);
      }

      to {
        transform: translate(-50%, 3vw);
      }
    }
  }

  p {
    @apply absolute text-sm left-1/2 -translate-x-1/2;
    bottom: -30px;
    white-space: nowrap;
  }
}

.link-btn {
  @apply border px-3 py-1 rounded-sm backdrop-blur cursor-pointer transition-all;
}

.title {
  @apply text-yellow-300 text-5xl;
}

.subtitle {
  @apply text-center relative text-sm md:text-3xl text-yellow-300 pb-4;

  span {
    @apply text-lg md:text-sm block text-yellow-100;
  } 

  &:before {
    @apply absolute left-0 bg-yellow-300;
    content: '';
    width: 10px;
    height: 10px;
    top: 50%;
    margin-top: -5px;
  }

  &:after {
    @apply absolute left-0 bg-yellow-300;
    content: '';
    width: 100%;
    height: 1px;
    bottom: 0;
  }

  &.active {
    &:before {
      height: 30px;
      margin-top: -15px;
      animation: rotation 3s forwards infinite linear;

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }


    }
  }
}

.content {
  @apply transition-all hover:shadow-2xl text-xs md:text-sm hover:bg-black/30 bg-black/10 text-white backdrop-blur my-12 p-8 md:p-12 border-yellow-300 border md:border-4;

  .token-item {
    @apply flex items-center justify-between gap-8; 
    .label {

    }

    .value{

    }
  }
}

</style>

<script setup>

import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, getDocs, doc, setDoc, collection } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { ref, onMounted } from "vue"
import useEthereum from "@/utils/useEthereum"
import AOS from "aos"
import store from "@/store"

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { MerkleTree } from "merkletreejs";

import whitelist from "@/assets/whitelist.json";
import whitelist2 from "@/assets/whitelist2.json";

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyB9uJeHJjwyl3TN1f1OA6Bg18n_9dcwwhw",
  authDomain: "tamagogi-6455f.firebaseapp.com",
  projectId: "tamagogi-6455f",
  storageBucket: "tamagogi-6455f.appspot.com",
  messagingSenderId: "558491248440",
  appId: "1:558491248440:web:01d88f1e54bd3e010103cd",
  measurementId: "G-JJTDC0QEBZ"
};
const firebaseApp = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LeYGV4iAAAAALQN35nZBZRlXI9T-xMblL27bvV1'),
  isTokenAutoRefreshEnabled: true
});
const db = getFirestore(firebaseApp);

const register = async () => {
  isLoading.value = true;
  if (store.state.connectedAddress == '') {
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'You should connect wallet first.' })
  } else {
    var balance = await store.state.web3.eth.getBalance(store.state.connectedAddress);
    balance = store.state.web3.utils.fromWei(balance.toString(), 'ether')
    if (balance >= 0.02) {
      const docRef = doc(db, "whitelist-potted", store.state.connectedAddress);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'Address exist.' })
      } else {
        let date = new Date();
        let options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        await setDoc(doc(db, "whitelist-potted", store.state.connectedAddress), {
          add: true,
          timestamp: date.toLocaleTimeString("en-us", options)
        });

        store.dispatch("setStateData", { name: "showAlert", data: true })
        store.dispatch("setStateData", { name: "alertMsg", data: 'Address added successfully, Please follow our twitter and discord for latest news!' })
      }
    } else {
      store.dispatch("setStateData", { name: "showAlert", data: true })
      store.dispatch("setStateData", { name: "alertMsg", data: 'You need at least 0.02 eth in your wallet.' })
    }
  }
  isLoading.value = false;
}

// Web3
const { init, requestAccount, allowlistMint, publicMint } = useEthereum()

const scrollPos = ref(0);
const scrollTo = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });;
}

const introPottedRef = ref(null);

const isLoading = ref(false);

const claimlistAddr = whitelist.addresses;
const whitelistAddr = whitelist2.addresses;

const getClaimProof = () => {
  const leafNodes = claimlistAddr.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  return merkleTree.getHexProof(leafNodes[checkClaimWLIdx()]);
}

const checkClaimWLIdx = () => {
  const idx = claimlistAddr.findIndex(e => e.toLowerCase() == store.state.connectedAddress.toLowerCase());
  return idx;
}

const getAllowlistProof = () => {
  const leafNodes = whitelistAddr.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  return merkleTree.getHexProof(leafNodes[checkAllowlistIdx()]);
}

const checkAllowlistIdx = () => {
  const idx = whitelistAddr.findIndex(e => e.toLowerCase() == store.state.connectedAddress.toLowerCase());
  return idx;
}

const mint = (type) => {
  if (store.state.connectedAddress == '') {
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Please connect wallet first.' })
    return;
  }
  if (store.state.minting) {
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Transaction pending...' })
    return;
  }

  if (type == 'claim' && store.state.nftConfig.phase == 1) {
    store.dispatch("setStateData", { name: "setMinting", data: true })
    allowlistMint(getClaimProof());
  } else if (type == 'presale' && store.state.nftConfig.phase == 2) {
    store.dispatch("setStateData", { name: "setMinting", data: true })
    allowlistMint(getAllowlistProof());
  } else if (type == 'public' && store.state.nftConfig.phase == 3) {
    store.dispatch("setStateData", { name: "setMinting", data: true })
    publicMint(1)
  } else {
    store.dispatch("setStateData", { name: "showAlert", data: true })
    store.dispatch("setStateData", { name: "alertMsg", data: 'Not in a valid mint stage.' })
    return;
  }
}

let lastFetched = 0;

const rewrokSvgString = (string) => {
  let newString = string;
  const imgsCount = string.match(/<image*/g);

  for (let i = 0; i < imgsCount.length; i++) {
    if (i <= 1) {
      newString = newString.replace('<image x', `<image data-aos="fade" data-aos-duration="500" data-aos-delay="${i * 400}" x`)
    } else {
      newString = newString.replace('<image x', `<image data-aos="zoom-in" data-aos-duration="500" data-aos-delay="${(i + 1) * 100 + 400}" x`)
    }
  }

  introPottedRef.value.innerHTML = '';
  introPottedRef.value.insertAdjacentHTML('beforeend', newString)

  AOS.refresh()
}

const fetchIntroPotted = () => {
  let ran = Math.floor(Math.random() * (30 - 1 + 1)) + 1;

  if (lastFetched == ran) {
    lastFetched = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
  } else {
    lastFetched = ran;
  }

  fetch(`./preview/${lastFetched}.svg`)
    .then(r => r.text())
    .then(text => {
      rewrokSvgString(text);
    })

}

const phaseTimestamp = [1665079200000, 1665082800000, 1665086400000, 1665090000000]

const gardenSoon = () => {
  store.dispatch("setStateData", { name: "showAlert", data: true })
  store.dispatch("setStateData", { name: "alertMsg", data: 'Coming soon!' })
}

const welcome = () => {
  store.dispatch("setStateData", { name: "showAlert", data: true })
  store.dispatch("setStateData", { name: "alertMsg", data: 'Welcome to Potted-potted.' })
}

onMounted(() => {
  AOS.init()
  init()

  fetchIntroPotted()

  setInterval(() => {

    fetchIntroPotted()
  }, 5000);

  // welcome()

  window.addEventListener('scroll', function () { scrollPos.value = this.scrollY })
})
</script>
