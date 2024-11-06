import Announcement from '@/components/Programs/Announcement'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import "@testing-library/jest-dom/vitest";


describe('Announcement', () => {
    it('It should render no data when the data is empty', () => {
        render(<Announcement/>);

        expect(screen.getByText(/no data created/i)).toBeInTheDocument()

    })


})