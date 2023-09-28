import BaseIcon from './base';
import clsx from 'clsx';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const Icon: React.FC<IconProps> = ({className = '', ...props}) => {
  return (
    <BaseIcon
      width="24"
      height="24"
      className={clsx(className)}
      viewBox="0 0 24 24"
      {...props}
    >
      <g id="phone">
        <path
          id="Vector"
          d="M21.9975 16.9201V19.9201C21.9986 20.1986 21.9416 20.4743 21.83 20.7294C21.7184 20.9846 21.5548 21.2137 21.3496 21.402C21.1443 21.5902 20.9021 21.7336 20.6382 21.8228C20.3744 21.912 20.0949 21.9452 19.8175 21.9201C16.7403 21.5857 13.7845 20.5342 11.1875 18.8501C8.77132 17.3148 6.72283 15.2663 5.18749 12.8501C3.49747 10.2413 2.44573 7.27109 2.11749 4.1801C2.0925 3.90356 2.12537 3.62486 2.21399 3.36172C2.30262 3.09859 2.44506 2.85679 2.63226 2.65172C2.81945 2.44665 3.0473 2.28281 3.30128 2.17062C3.55527 2.05843 3.82983 2.00036 4.10749 2.0001H7.10749C7.5928 1.99532 8.06328 2.16718 8.43125 2.48363C8.79922 2.80008 9.03957 3.23954 9.10749 3.7201C9.23411 4.68016 9.46894 5.62282 9.80749 6.5301C9.94204 6.88802 9.97115 7.27701 9.8914 7.65098C9.81164 8.02494 9.62635 8.36821 9.35749 8.6401L8.08749 9.9101C9.51105 12.4136 11.5839 14.4865 14.0875 15.9101L15.3575 14.6401C15.6294 14.3712 15.9726 14.1859 16.3466 14.1062C16.7206 14.0264 17.1096 14.0556 17.4675 14.1901C18.3748 14.5286 19.3174 14.7635 20.2775 14.8901C20.7633 14.9586 21.2069 15.2033 21.524 15.5776C21.8412 15.9519 22.0097 16.4297 21.9975 16.9201Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </BaseIcon>
  );
};

export default Icon;
