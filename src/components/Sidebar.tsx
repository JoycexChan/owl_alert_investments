import React from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ onSelect }: { onSelect: (section: string) => void }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.contentArea}>

               <div onClick={() => onSelect('latest')}>
               <svg id="Layer_1" height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m22.293 15.707-2.288-2.288 1.414-1.414 2.288 2.288zm1.414-10-1.414-1.414-2.25 2.25 1.414 1.414zm.293 3.293h-3v2h3zm-15.63 8h-5.631l3.111 7h1.4a2.752 2.752 0 0 0 2.514-3.868zm9.63-17v20h-2a5.006 5.006 0 0 0 -5-5h-8a3 3 0 0 1 -3-3v-4a3 3 0 0 1 3-3h8a5.006 5.006 0 0 0 5-5z"/></svg>
                <div>最新動態</div>
               </div>

               <div onClick={() => onSelect('valuation')}>
               <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="40" height="40"><path d="M23.944,12.669l-3.031-8.66c-.42-1.202-1.559-2.01-2.832-2.01h-5.081V1c0-.552-.447-1-1-1s-1,.448-1,1v1H5.919c-1.273,0-2.412,.808-2.832,2.009L.056,12.669c-.037,.106-.056,.632-.056,.632,0,2.506,1.871,4.567,4.26,4.692,1.241,.069,2.434-.371,3.338-1.229,.892-.846,1.402-2.036,1.402-3.264,0,0-.021-.732-.061-.842L5.794,4.008c.041-.005,.083-.008,.125-.008h5.081V22H5c-.553,0-1,.448-1,1s.447,1,1,1h14c.553,0,1-.448,1-1s-.447-1-1-1h-6V4h5.081c.042,0,.084,.002,.125,.008l-3.146,8.65c-.04,.109-.061,.842-.061,.842,0,1.229,.511,2.418,1.402,3.264,.845,.802,1.828,1.229,3.339,1.229,2.391,0,4.259-2.186,4.259-4.692,0,0-.019-.526-.056-.632ZM4.364,15.997c-1.081-.057-1.986-.902-2.266-1.997H6.95c-.1,.499-.35,.954-.729,1.313-.502,.477-1.164,.719-1.856,.683Zm2.208-3.997H2.409l2.042-5.833,2.121,5.833Zm12.977-5.833l2.042,5.833h-4.163l2.121-5.833Zm.088,9.83c-.688,.036-1.354-.206-1.857-.683-.379-.36-.629-.815-.729-1.313h4.852c-.28,1.094-1.184,1.94-2.265,1.997Z"/></svg>

                <div>價值評估</div>
                </div>

               <div onClick={() => onSelect('financial')}>
               <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="40" height="40"><path d="M13.053,5.079c.971-.909,2.344-2.36,2.894-3.744,.255-.641-.257-1.335-.947-1.335h-6c-.69,0-1.202,.693-.947,1.335,.55,1.384,1.923,2.835,2.894,3.744C5.569,5.878,1,12.618,1,18c0,3.309,2.691,6,6,6h10c3.309,0,6-2.691,6-6,0-5.382-4.569-12.122-9.947-12.921Zm-2.409,8.682l3.042,.507c1.341,.223,2.315,1.373,2.315,2.733,0,1.654-1.346,3-3,3v1c0,.552-.448,1-1,1s-1-.448-1-1v-1h-.268c-1.068,0-2.063-.574-2.598-1.499-.276-.478-.113-1.089,.365-1.366,.476-.277,1.089-.114,1.366,.365,.178,.308,.511,.5,.867,.5h2.268c.551,0,1-.449,1-1,0-.378-.271-.698-.644-.76l-3.042-.507c-1.341-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552,.448-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063,.575,2.598,1.5,.276,.478,.113,1.089-.365,1.366-.477,.277-1.089,.114-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.551,0-1,.449-1,1,0,.378,.271,.698,.644,.76Z"/></svg>
                <div>財務報表</div>
                </div>
                

               <div onClick={() => onSelect('news')}>
               <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="40" height="40"><path  d="M15.746,18.254c0-1.5-1.031-3.55-2.9-5.773A1.088,1.088,0,0,0,12,12.092h0a1.117,1.117,0,0,0-.854.391h0C9.1,14.88,8.1,17,8.273,18.625a3.668,3.668,0,0,0,1.582,2.557A3.622,3.622,0,0,0,12,22,3.75,3.75,0,0,0,15.746,18.254Z"/><path d="M16.629,2.9c-.786-.668-1.611-1.368-2.451-2.132A2.952,2.952,0,0,0,11.8.028a2.847,2.847,0,0,0-2.032,1.3A20.39,20.39,0,0,0,7.276,7.776,6.233,6.233,0,0,1,6.8,6.961a2,2,0,0,0-3.3-.473A9.069,9.069,0,0,0,.915,12.909,10.979,10.979,0,0,0,9.136,23.64a11.651,11.651,0,0,0,2.776.352,5.552,5.552,0,0,1-3.278-1.226,5.631,5.631,0,0,1-2.35-3.934c-.23-2.21.893-4.783,3.338-7.647h0A3.114,3.114,0,0,1,12,10.092h.01a3.1,3.1,0,0,1,2.366,1.1c1.538,1.827,3.373,4.535,3.373,7.061A5.749,5.749,0,0,1,12.39,23.98a11.056,11.056,0,0,0,10.7-11.065C23.085,8.385,20.093,5.845,16.629,2.9Z"/></svg>
                <div>相關新聞</div>
                </div>




        </div>
        </div>
    );
};

export default Sidebar;
